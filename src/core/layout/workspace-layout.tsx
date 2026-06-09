import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { Sidebar } from "@/core/layout/sidebar";
import { StatusBar } from "@/core/layout/status-bar";
import { usePlatformStore } from "@/core/stores/platform-store";
import { useWorkspaceStore } from "@/core/stores/workspace-store";

export function WorkspaceLayout() {
  const { id } = useParams<{ id: string }>();
  const { setViewMode } = usePlatformStore();
  const { setActiveWorkspace, workspaces } = useWorkspaceStore();

  useEffect(() => {
    if (id) {
      setViewMode("workspace");
      setActiveWorkspace(id);
    }
  }, [id, setViewMode, setActiveWorkspace]);

  const workspace = workspaces.find((w) => w.id === id);

  if (!workspace) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <div className="text-center space-y-2">
          <p className="text-lg font-semibold">Workspace not found</p>
          <p className="text-sm text-muted-foreground">
            The workspace you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>
        <StatusBar />
      </div>
    </div>
  );
}
