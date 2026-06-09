import { useParams } from "react-router-dom";
import { PageHeader } from "@/core/ui/page-header";
import { Card, CardContent } from "@/core/ui/card";
import { Badge } from "@/core/ui/badge";
import { Button } from "@/core/ui/button";
import { StatusDot } from "@/core/ui/status-dot";
import { EmptyState } from "@/core/ui/empty-state";
import { useWorkspaceStore } from "@/core/stores/workspace-store";
import { Cable, Plus, Plug, Wifi } from "lucide-react";

export default function WorkspaceSourcesPage() {
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

  if (workspace.sourceCount === 0) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Sources"
          description={`Connected data sources for ${workspace.name}`}
          action={
            <Button size="sm" disabled>
              <Plus className="size-4" />
              Connect Source
            </Button>
          }
        />
        <EmptyState
          icon={<Cable className="size-12" />}
          title="No sources connected"
          description="Connect a data source to start receiving events in this workspace."
          actionLabel="Connect Source"
          onAction={() => {}}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sources"
        description={`Connected data sources for ${workspace.name}`}
        action={
          <Button size="sm" disabled>
            <Plus className="size-4" />
            Connect Source
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Wifi className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Source Alpha</h3>
                  <p className="text-xs text-muted-foreground">Window capture source</p>
                </div>
              </div>
              <Badge variant="success">Active</Badge>
            </div>
            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <StatusDot color="success" pulse />
                <span>Receiving data</span>
              </div>
              <span>523 events</span>
              <span>Connected 2h ago</span>
            </div>
            <div className="mt-3 flex gap-2 border-t border-border pt-3">
              <Button variant="outline" size="sm" disabled>
                Configure
              </Button>
              <Button variant="outline" size="sm" disabled>
                Disconnect
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-secondary/50">
                  <Plug className="size-5 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">Source Beta</h3>
                  <p className="text-xs text-muted-foreground">API data source</p>
                </div>
              </div>
              <Badge variant="secondary">Idle</Badge>
            </div>
            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <StatusDot color="idle" />
                <span>Waiting for connection</span>
              </div>
              <span>0 events</span>
              <span>Configured 1d ago</span>
            </div>
            <div className="mt-3 flex gap-2 border-t border-border pt-3">
              <Button variant="outline" size="sm" disabled>
                Configure
              </Button>
              <Button variant="outline" size="sm" disabled>
                Connect
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
