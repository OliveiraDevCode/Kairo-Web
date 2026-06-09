import { useEffect } from "react";
import { StatusCard } from "@/components/shared/StatusCard";
import { MetricCard } from "@/components/shared/MetricCard";
import { ConnectionBadge } from "@/components/shared/ConnectionBadge";
import { PageSection } from "@/components/shared/PageSection";
import { useConnectionStore } from "@/stores/connection-store";
import { useTableStore } from "@/stores/table-store";
import { useSnapshotStore } from "@/stores/snapshot-store";
import { useLearningStore } from "@/stores/learning-store";
import { telemetry } from "@/lib/telemetry";
import {
  Wifi,
  WifiOff,
  Table2,
  Camera,
  Building2,
} from "lucide-react";

export default function DashboardPage() {
  const backendStatus = useConnectionStore((s) => s.backendStatus);
  const wsStatus = useConnectionStore((s) => s.wsStatus);
  const tableCount = useConnectionStore((s) => s.tableCount);
  const tables = useTableStore((s) => s.tables);
  const recentCount = useSnapshotStore((s) => s.recent.length);
  const stats = useLearningStore((s) => s.stats);

  useEffect(() => {
    telemetry.emit("dashboard_loaded", {
      backendStatus,
      wsStatus,
      tableCount,
      timestamp: Date.now(),
    });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Pipeline overview and live status</p>
      </div>

      {/* Connection status row */}
      <PageSection title="Connection" description="Backend and WebSocket live status">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatusCard
            title="Backend"
            value={backendStatus === "online" ? "Connected" : backendStatus === "offline" ? "Offline" : "Unknown"}
            variant={backendStatus === "online" ? "success" : backendStatus === "offline" ? "error" : "default"}
            icon={backendStatus === "online" ? <Wifi className="size-4" /> : <WifiOff className="size-4" />}
          />
          <StatusCard
            title="WebSocket"
            value={wsStatus === "connected" ? "Connected" : wsStatus === "connecting" ? "Connecting" : "Disconnected"}
            variant={wsStatus === "connected" ? "success" : wsStatus === "connecting" ? "warning" : "error"}
            icon={wsStatus === "connected" ? <Wifi className="size-4" /> : <WifiOff className="size-4" />}
          />
          <StatusCard
            title="Active Tables"
            value={tableCount}
            variant={tableCount > 0 ? "success" : "default"}
            icon={<Table2 className="size-4" />}
          />
          <StatusCard
            title="Snapshots Received"
            value={recentCount}
            icon={<Camera className="size-4" />}
          />
        </div>
      </PageSection>

      {/* Quick stats row */}
      {stats && (
        <PageSection title="Learning" description="Training and dataset metrics">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              label="Coverage"
              value={`${stats.session.coverage}/52`}
              trend={`${stats.session.coverage_pct}%`}
              trendDirection={stats.session.coverage >= 39 ? "up" : stats.session.coverage >= 13 ? "neutral" : "down"}
            />
            <MetricCard
              label="Accuracy"
              value={`${stats.lifetime.accuracy}%`}
              trend={`Lifetime: ${stats.lifetime.samples} samples`}
              trendDirection={stats.lifetime.accuracy >= 80 ? "up" : stats.lifetime.accuracy >= 50 ? "neutral" : "down"}
            />
            <MetricCard
              label="Session Samples"
              value={stats.session.samples}
              trend={`+${stats.lifetime.samples_today} today`}
              trendDirection={stats.lifetime.samples_today > 0 ? "up" : "neutral"}
            />
            <MetricCard
              label="Training"
              value={stats.training.training_enabled ? "Enabled" : "Disabled"}
              trend={stats.training.model_exists ? `v${stats.training.model_version}` : "No model"}
              trendDirection={stats.training.training_enabled ? "up" : "neutral"}
            />
          </div>
        </PageSection>
      )}

      {/* Tables overview */}
      {tables.length > 0 && (
        <PageSection title="Current Tables" description={`${tableCount} table(s) detected`}>
          <div className="grid gap-4 md:grid-cols-2">
            {tables.slice(0, 4).map((t) => (
              <StatusCard
                key={t.id}
                title={t.name}
                value={`${t.active_players} players · ${t.phase}`}
                subtitle={`Hero: ${t.hero_cards.join(" ")} · Pot: $${t.pot.toFixed(2)}`}
                icon={<Building2 className="size-4" />}
              />
            ))}
          </div>
        </PageSection>
      )}

      {/* Health indicator */}
      {stats && (
        <PageSection title="Pipeline Health" description={stats.health.detail}>
          <ConnectionBadge state={stats.health.status.toLowerCase() as "healthy" | "degraded" | "blocked"} />
        </PageSection>
      )}
    </div>
  );
}
