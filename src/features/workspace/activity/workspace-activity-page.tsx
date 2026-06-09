import { useParams } from "react-router-dom";
import { PageHeader } from "@/core/ui/page-header";
import { Card, CardContent } from "@/core/ui/card";
import { Badge } from "@/core/ui/badge";
import { Button } from "@/core/ui/button";
import { EmptyState } from "@/core/ui/empty-state";
import { useWorkspaceStore } from "@/core/stores/workspace-store";
import { Activity, Filter, RefreshCw, Bell } from "lucide-react";

const MOCK_EVENTS = [
  { ts: "14:32:18", msg: "Knowledge entry added (fact)", type: "info" as const },
  { ts: "14:31:45", msg: "Source Alpha: data batch received (200 events)", type: "info" as const },
  { ts: "14:30:05", msg: "Training job completed successfully", type: "success" as const },
  { ts: "14:28:00", msg: "Model v4 deployed with accuracy 93.2%", type: "success" as const },
  { ts: "14:25:30", msg: "Dataset updated (+200 new samples)", type: "info" as const },
  { ts: "14:22:15", msg: "Source connection established", type: "info" as const },
  { ts: "14:20:00", msg: "Cross-workspace knowledge imported", type: "info" as const },
  { ts: "14:15:00", msg: "Training job started — dataset v3", type: "info" as const },
  { ts: "14:10:00", msg: "Source Beta: connection lost — retrying", type: "warning" as const },
  { ts: "14:05:00", msg: "Model evaluation completed (91.5% accuracy)", type: "success" as const },
];

export default function WorkspaceActivityPage() {
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

  return (
    <div className="space-y-6">
      <PageHeader
        title="Activity"
        description={`Event feed for ${workspace.name}`}
        action={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              <Filter className="size-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" disabled>
              <RefreshCw className="size-4" />
              Refresh
            </Button>
          </div>
        }
      />

      <Card>
        <CardContent className="p-5">
          <div className="space-y-1">
            {MOCK_EVENTS.map((event, i) => (
              <div
                key={i}
                className="flex items-start gap-3 border-b border-border py-2 last:border-0"
              >
                <span className="text-xs text-muted-foreground font-mono shrink-0 mt-0.5 w-16">
                  {event.ts}
                </span>
                <Badge
                  variant={
                    event.type === "success"
                      ? "success"
                      : event.type === "warning"
                        ? "warning"
                        : "secondary"
                  }
                  className="shrink-0 w-16 justify-center"
                >
                  {event.type}
                </Badge>
                <span className="text-sm">{event.msg}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Bell className="size-3" />
        <span>Showing 10 most recent events</span>
      </div>
    </div>
  );
}
