import { useParams } from "react-router-dom";
import { PageHeader } from "@/core/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/core/ui/card";
import { Badge } from "@/core/ui/badge";
import { Button } from "@/core/ui/button";
import { useWorkspaceStore } from "@/core/stores/workspace-store";
import { Settings, Trash2, Save } from "lucide-react";

export default function WorkspaceSettingsPage() {
  const { id } = useParams<{ id: string }>();
  const { workspaces, removeWorkspace } = useWorkspaceStore();
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
        title="Workspace Settings"
        description={`Configuration for ${workspace.name}`}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings className="size-4 text-muted-foreground" />
              <CardTitle className="text-sm">General</CardTitle>
            </div>
            <CardDescription>
              Workspace name and description
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Name</label>
              <p className="text-sm">{workspace.name}</p>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Description</label>
              <p className="text-sm text-muted-foreground">{workspace.description}</p>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Status</label>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    workspace.status === "running"
                      ? "success"
                      : workspace.status === "error"
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {workspace.status}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Created {workspace.createdAt}
                </span>
              </div>
            </div>
            <Button variant="outline" size="sm" disabled>
              <Save className="size-4" />
              Save Changes
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Trash2 className="size-4 text-error" />
              <CardTitle className="text-sm text-error">Danger Zone</CardTitle>
            </div>
            <CardDescription>
              Irreversible actions for this workspace
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Deleting this workspace will permanently remove all associated
              data, including knowledge, datasets, and models. This action
              cannot be undone.
            </p>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeWorkspace(workspace.id)}
            >
              <Trash2 className="size-4" />
              Delete Workspace
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
