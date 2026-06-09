import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/core/ui/page-header";
import { Card, CardContent } from "@/core/ui/card";
import { Badge } from "@/core/ui/badge";
import { Button } from "@/core/ui/button";
import { EmptyState } from "@/core/ui/empty-state";
import { StatusDot } from "@/core/ui/status-dot";
import { useWorkspaceStore } from "@/core/stores/workspace-store";
import { usePlatformStore } from "@/core/stores/platform-store";
import { WorkspaceCreateModal } from "@/features/platform/workspaces/workspace-create-modal";
import {
  FolderKanban,
  Plus,
  ExternalLink,
  MoreHorizontal,
  Trash2,
  Layers,
} from "lucide-react";

export default function WorkspacesPage() {
  const { workspaces, removeWorkspace } = useWorkspaceStore();
  const { setViewMode } = usePlatformStore();
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const handleEnterWorkspace = (id: string) => {
    setViewMode("workspace");
    navigate(`/workspaces/${id}/dashboard`);
  };

  if (workspaces.length === 0) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Workspaces"
          description="Manage your AI workspaces"
          action={
            <Button onClick={() => setShowCreate(true)} size="sm">
              <Plus className="size-4" />
              New Workspace
            </Button>
          }
        />
        <EmptyState
          icon={<Layers className="size-12" />}
          title="No workspaces yet"
          description="Create your first workspace to start organizing your AI projects."
          actionLabel="Create Workspace"
          onAction={() => setShowCreate(true)}
        />
        {showCreate && (
          <WorkspaceCreateModal
            onClose={() => setShowCreate(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Workspaces"
        description="Manage your AI workspaces"
        action={
          <Button onClick={() => setShowCreate(true)} size="sm">
            <Plus className="size-4" />
            New Workspace
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {workspaces.map((ws) => (
          <Card key={ws.id} className="relative">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{ws.icon}</span>
                  <div>
                    <h3 className="font-semibold">{ws.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {ws.description}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setMenuOpen(menuOpen === ws.id ? null : ws.id)
                    }
                  >
                    <MoreHorizontal className="size-4" />
                  </Button>
                  {menuOpen === ws.id && (
                    <div className="absolute right-0 top-8 z-10 w-36 rounded-lg border border-border bg-popover shadow-lg">
                      <button
                        onClick={() => {
                          handleEnterWorkspace(ws.id);
                          setMenuOpen(null);
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-accent"
                      >
                        <ExternalLink className="size-3" />
                        Open
                      </button>
                      <button
                        onClick={() => {
                          removeWorkspace(ws.id);
                          setMenuOpen(null);
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-sm text-error hover:bg-accent"
                      >
                        <Trash2 className="size-3" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <StatusDot
                    color={
                      ws.status === "running"
                        ? "success"
                        : ws.status === "error"
                          ? "error"
                          : "idle"
                    }
                    pulse={ws.status === "running"}
                  />
                  <span className="capitalize">{ws.status}</span>
                </div>
                <span>{ws.sourceCount} sources</span>
                <span>{ws.eventCount} events</span>
              </div>

              <div className="mt-4 flex items-center gap-2 border-t border-border pt-3">
                <Badge
                  variant={
                    ws.status === "running"
                      ? "success"
                      : ws.status === "error"
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {ws.status === "running" ? "Active" : ws.status}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Created {ws.createdAt}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto"
                  onClick={() => handleEnterWorkspace(ws.id)}
                >
                  <ExternalLink className="size-3" />
                  Open
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center justify-center rounded-xl border-2 border-dashed border-border p-8 transition-colors hover:border-primary/50 hover:bg-accent/50"
        >
          <div className="text-center">
            <Plus className="mx-auto size-8 text-muted-foreground/40" />
            <p className="mt-2 text-sm font-medium text-muted-foreground">
              New Workspace
            </p>
          </div>
        </button>
      </div>

      {showCreate && (
        <WorkspaceCreateModal onClose={() => setShowCreate(false)} />
      )}
    </div>
  );
}
