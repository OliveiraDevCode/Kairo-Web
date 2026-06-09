import { usePlatformStore } from "@/core/stores/platform-store";
import { useWorkspaceStore } from "@/core/stores/workspace-store";
import { StatusDot } from "@/core/ui/status-dot";

export function StatusBar() {
  const { viewMode } = usePlatformStore();
  const { workspaces, activeWorkspaceId } = useWorkspaceStore();

  const activeWorkspace = workspaces.find((w) => w.id === activeWorkspaceId);

  return (
    <footer className="flex h-8 items-center justify-between border-t border-border bg-card px-4 text-xs text-muted-foreground">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5">
          <StatusDot color="success" pulse />
          Connected
        </span>
        {viewMode === "workspace" && activeWorkspace && (
          <>
            <span className="text-muted-foreground/40">|</span>
            <span>
              {activeWorkspace.name} · {activeWorkspace.uptime}
            </span>
          </>
        )}
      </div>
      <div className="flex items-center gap-3">
        <span>Platform</span>
        <span className="text-muted-foreground/40">|</span>
        <span>v0.2.0</span>
      </div>
    </footer>
  );
}
