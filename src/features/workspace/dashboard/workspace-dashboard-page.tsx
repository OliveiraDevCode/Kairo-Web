import { useParams } from "react-router-dom";
import { PageHeader } from "@/core/ui/page-header";
import { MetricCard } from "@/core/ui/metric-card";
import { Card, CardContent } from "@/core/ui/card";
import { Badge } from "@/core/ui/badge";
import { StatusDot } from "@/core/ui/status-dot";
import { useWorkspaceStore } from "@/core/stores/workspace-store";
import {
  Activity,
  Cable,
  BookOpen,
  Clock,
  TrendingUp,
} from "lucide-react";

export default function WorkspaceDashboardPage() {
  const { id } = useParams<{ id: string }>();
  const { workspaces } = useWorkspaceStore();
  const workspace = workspaces.find((w) => w.id === id);

  if (!workspace) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Workspace not found</p>
      </div>
    );
  }

  const recentActivity = [
    { ts: "14:32:18", msg: "Knowledge entry added (fact)", type: "info" as const },
    { ts: "14:30:05", msg: "Source data received (12 events)", type: "info" as const },
    { ts: "14:28:00", msg: "Model v4 deployed — accuracy 93.2%", type: "success" as const },
    { ts: "14:25:30", msg: "Training job completed", type: "success" as const },
    { ts: "14:20:00", msg: "Dataset updated (+200 samples)", type: "info" as const },
  ];

  const statusColor = workspace.status === "running" ? "success" : workspace.status === "error" ? "error" : "idle";

  return (
    <div className="space-y-6">
      <PageHeader
        title={workspace.name}
        description={workspace.description}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Status"
          value={
            <div className="flex items-center gap-2">
              <StatusDot color={statusColor} pulse={workspace.status === "running"} />
              <span className="capitalize">{workspace.status}</span>
            </div>
          }
          trend={`Created ${workspace.createdAt}`}
          icon={<Activity className="size-5" />}
        />
        <MetricCard
          label="Uptime"
          value={workspace.uptime}
          trend={workspace.status === "running" ? "Currently active" : "Inactive"}
          trendDirection={workspace.status === "running" ? "up" : "neutral"}
          icon={<Clock className="size-5" />}
        />
        <MetricCard
          label="Connected Sources"
          value={workspace.sourceCount}
          trend={workspace.sourceCount > 0 ? "Data flowing" : "No sources"}
          trendDirection={workspace.sourceCount > 0 ? "up" : "neutral"}
          icon={<Cable className="size-5" />}
        />
        <MetricCard
          label="Knowledge Entries"
          value="1,240"
          trend="Across all buckets"
          trendDirection="up"
          icon={<BookOpen className="size-5" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="p-5">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Connected Sources
              </h3>
            </div>
            {workspace.sourceCount === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Cable className="size-8 text-muted-foreground/40" />
                <p className="mt-2 text-sm text-muted-foreground">
                  No sources connected yet
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div className="flex items-center gap-2">
                    <StatusDot color="success" pulse />
                    <span className="text-sm font-medium">Source Alpha</span>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div className="flex items-center gap-2">
                    <StatusDot color="idle" />
                    <span className="text-sm font-medium">Source Beta</span>
                  </div>
                  <Badge variant="secondary">Idle</Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Recent Activity
              </h3>
            </div>
            <div className="space-y-3">
              {recentActivity.map((entry, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 border-b border-border pb-2 last:border-0"
                >
                  <span className="text-xs text-muted-foreground font-mono shrink-0 mt-0.5">
                    {entry.ts}
                  </span>
                  <Badge
                    variant={
                      entry.type === "success"
                        ? "success"
                        : "secondary"
                    }
                    className="shrink-0"
                  >
                    {entry.type}
                  </Badge>
                  <span className="text-sm truncate">{entry.msg}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
          <TrendingUp className="size-5 text-primary" />
          <div>
            <p className="text-sm font-medium">Session Health</p>
            <p className="text-xs text-muted-foreground">
              All systems operational
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
          <Activity className="size-5 text-primary" />
          <div>
            <p className="text-sm font-medium">Events Today</p>
            <p className="text-xs text-muted-foreground">
              {workspace.eventCount} events processed
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
          <Clock className="size-5 text-primary" />
          <div>
            <p className="text-sm font-medium">Last Activity</p>
            <p className="text-xs text-muted-foreground">
              {workspace.status === "running" ? "Just now" : "Inactive"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
