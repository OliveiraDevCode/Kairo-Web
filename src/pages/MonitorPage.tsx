import { useEffect } from "react";
import { useMonitorStore } from "@/stores/monitor-store";
import { useLearningStore } from "@/stores/learning-store";
import { useConnectionStore } from "@/stores/connection-store";
import { useTableStore } from "@/stores/table-store";
import { PageSection } from "@/components/shared/PageSection";
import { StatusCard } from "@/components/shared/StatusCard";
import { MetricCard } from "@/components/shared/MetricCard";
import { ConnectionBadge } from "@/components/shared/ConnectionBadge";
import { Card, CardContent } from "@/components/ui/card";
import { telemetry } from "@/lib/telemetry";

function RecentEventsPanel() {
  const feed = useMonitorStore((s) => s.activityFeed);

  return (
    <Card>
      <CardContent className="p-4 space-y-2 max-h-80 overflow-y-auto">
        {feed.length === 0 && (
          <p className="text-sm text-muted-foreground">No events yet.</p>
        )}
        {feed.map((entry, i) => {
          const ts = entry.startsWith("[") ? entry.slice(0, entry.indexOf("]") + 1) : "";
          const msg = ts ? entry.slice(entry.indexOf("]") + 2) : entry;
          return (
            <div key={i} className="flex items-start gap-3 text-sm border-b border-border pb-2 last:border-0">
              {ts && <span className="text-xs text-muted-foreground font-mono shrink-0">{ts}</span>}
              <span className="text-foreground">{msg}</span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

export default function MonitorPage() {
  const health = useMonitorStore((s) => s.health);
  const learningStats = useLearningStore((s) => s.stats);
  const backendStatus = useConnectionStore((s) => s.backendStatus);
  const wsStatus = useConnectionStore((s) => s.wsStatus);
  const tables = useTableStore((s) => s.tables);
  useEffect(() => {
    telemetry.emit("monitor_loaded", {
      healthStatus: health?.status,
      timestamp: Date.now(),
    });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Monitor</h1>
        <p className="text-sm text-muted-foreground">Pipeline health and live event feed</p>
      </div>

      {/* Health status */}
      <PageSection title="Pipeline Health">
        <div className="grid gap-4 md:grid-cols-3">
          <StatusCard
            title="Status"
            value={health?.status ?? "Unknown"}
            variant={
              health?.status === "HEALTHY" ? "success" :
              health?.status === "DEGRADED" ? "warning" :
              health?.status === "BLOCKED" ? "error" : "default"
            }
            subtitle={health?.detail}
          />
          <StatusCard
            title="Uptime"
            value={health ? `${health.uptime_secs}s` : "--"}
            subtitle={health?.is_running ? "Running" : "Stopped"}
          />
          <StatusCard
            title="Tables"
            value={tables.length}
            subtitle={`WS: ${wsStatus}`}
            variant={tables.length > 0 ? "success" : "default"}
          />
        </div>
      </PageSection>

      {/* Pipeline counters */}
      <PageSection title="Pipeline Counters" description="Session data capture metrics">
        <div className="grid gap-4 md:grid-cols-4">
          <MetricCard
            label="Session Hands"
            value={learningStats?.session.hands ?? "--"}
            trend={learningStats ? `Lifetime: ${learningStats.lifetime.hands.toLocaleString()}` : undefined}
            trendDirection="neutral"
          />
          <MetricCard
            label="Session Captures"
            value={learningStats?.session.captures ?? "--"}
            trend={learningStats ? `Lifetime: ${learningStats.lifetime.captures.toLocaleString()}` : undefined}
            trendDirection="neutral"
          />
          <MetricCard
            label="Samples Generated"
            value={learningStats?.session.samples ?? "--"}
            trend={learningStats ? `Total: ${learningStats.lifetime.samples.toLocaleString()}` : undefined}
            trendDirection={learningStats && learningStats.session.samples > 0 ? "up" : "neutral"}
          />
          <StatusCard
            title="Pipeline Health"
            value={health?.status ?? "Unknown"}
            variant={
              health?.status === "HEALTHY" ? "success" :
              health?.status === "DEGRADED" ? "warning" :
              health?.status === "BLOCKED" ? "error" : "default"
            }
            subtitle={health?.detail ?? ""}
          />
        </div>
      </PageSection>

      {/* Recent events */}
      <PageSection
        title="Recent Events"
        description="Live activity feed from the pipeline"
      >
        <RecentEventsPanel />
      </PageSection>

      {/* Backend status */}
      <div className="flex items-center gap-3 text-sm">
        <span className="text-muted-foreground">Backend:</span>
        <ConnectionBadge state={backendStatus} />
        <span className="text-muted-foreground">WebSocket:</span>
        <ConnectionBadge state={wsStatus as "connected" | "connecting" | "disconnected"} />
      </div>
    </div>
  );
}
