import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/core/ui/page-header";
import { MetricCard } from "@/core/ui/metric-card";
import { EmptyState } from "@/core/ui/empty-state";
import { Card, CardContent } from "@/core/ui/card";
import { Badge } from "@/core/ui/badge";
import { Button } from "@/core/ui/button";
import { useWorkspaceStore } from "@/core/stores/workspace-store";
import {
  FolderKanban,
  FlaskConical,
  Cable,
  Activity,
  Plus,
  ArrowRight,
  Layers,
  TrendingUp,
  Clock,
} from "lucide-react";

export default function DashboardPage() {
  const { workspaces } = useWorkspaceStore();
  const navigate = useNavigate();

  const activeWorkspaces = workspaces.filter((w) => w.status === "running").length;
  const totalDatasets = 12;
  const liveSources = workspaces.reduce((acc, w) => acc + w.sourceCount, 0);
  const eventsToday = workspaces.reduce((acc, w) => acc + w.eventCount, 0);

  if (workspaces.length === 0) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Dashboard"
          description="Platform overview and activity"
        />
        <EmptyState
          icon={<Layers className="size-12" />}
          title="Welcome to Kairo"
          description="Workspaces are isolated environments for your AI projects, research, and automation. Create your first workspace to get started."
          actionLabel="Create your first workspace"
          onAction={() => navigate("/workspaces")}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Platform overview and activity"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Active Workspaces"
          value={activeWorkspaces}
          trend={`${workspaces.length} total`}
          trendDirection={activeWorkspaces > 0 ? "up" : "neutral"}
          icon={<FolderKanban className="size-5" />}
        />
        <MetricCard
          label="Total Datasets"
          value={totalDatasets}
          trend="Across all workspaces"
          trendDirection="neutral"
          icon={<FlaskConical className="size-5" />}
        />
        <MetricCard
          label="Live Sources"
          value={liveSources}
          trend={`${workspaces.length} workspace(s)`}
          trendDirection={liveSources > 0 ? "up" : "neutral"}
          icon={<Cable className="size-5" />}
        />
        <MetricCard
          label="Events Today"
          value={eventsToday}
          trend="Last 24 hours"
          trendDirection={eventsToday > 0 ? "up" : "neutral"}
          icon={<Activity className="size-5" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Workspaces
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/workspaces")}
              >
                <ArrowRight className="size-4" />
              </Button>
            </div>
            <div className="space-y-3">
              {workspaces.slice(0, 4).map((ws) => (
                <button
                  key={ws.id}
                  onClick={() => navigate(`/workspaces/${ws.id}/dashboard`)}
                  className="flex w-full items-center gap-3 rounded-lg border border-border p-3 text-left transition-colors hover:bg-accent"
                >
                  <span className="text-lg">{ws.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{ws.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {ws.description}
                    </p>
                  </div>
                  <Badge
                    variant={
                      ws.status === "running"
                        ? "success"
                        : ws.status === "error"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {ws.status}
                  </Badge>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Recent Activity
              </h3>
            </div>
            <div className="space-y-3">
              {[
                {
                  ts: "14:32",
                  ws: "Research Lab",
                  msg: "Training completed — accuracy 93.2%",
                  type: "success" as const,
                },
                {
                  ts: "14:30",
                  ws: "My Workspace",
                  msg: "New knowledge entry added",
                  type: "info" as const,
                },
                {
                  ts: "14:28",
                  ws: "Automation Hub",
                  msg: "Source connected successfully",
                  type: "success" as const,
                },
                {
                  ts: "14:25",
                  ws: "Research Lab",
                  msg: "Dataset updated (+200 samples)",
                  type: "info" as const,
                },
                {
                  ts: "14:20",
                  ws: "My Workspace",
                  msg: "Source connection lost — retrying",
                  type: "warning" as const,
                },
              ].map((entry, i) => (
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
                        : entry.type === "warning"
                          ? "warning"
                          : "secondary"
                    }
                    className="shrink-0"
                  >
                    {entry.ws}
                  </Badge>
                  <span className="text-sm truncate">{entry.msg}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <button
          onClick={() => navigate("/workspaces")}
          className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-left transition-colors hover:bg-accent"
        >
          <Plus className="size-5 text-primary" />
          <div>
            <p className="text-sm font-medium">New Workspace</p>
            <p className="text-xs text-muted-foreground">
              Create a new isolated environment
            </p>
          </div>
        </button>
        <button
          onClick={() => navigate("/learning-lab")}
          className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-left transition-colors hover:bg-accent"
        >
          <TrendingUp className="size-5 text-primary" />
          <div>
            <p className="text-sm font-medium">Learning Lab</p>
            <p className="text-xs text-muted-foreground">
              Manage datasets and models
            </p>
          </div>
        </button>
        <button
          onClick={() => navigate("/knowledge")}
          className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-left transition-colors hover:bg-accent"
        >
          <Clock className="size-5 text-primary" />
          <div>
            <p className="text-sm font-medium">Knowledge</p>
            <p className="text-xs text-muted-foreground">
              Browse cross-workspace knowledge
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
