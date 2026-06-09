import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "@/core/layout/sidebar";
import { StatusBar } from "@/core/layout/status-bar";
import { usePlatformStore } from "@/core/stores/platform-store";
import { useWorkspaceStore } from "@/core/stores/workspace-store";

export function PlatformLayout() {
  const { setViewMode } = usePlatformStore();
  const { setActiveWorkspace } = useWorkspaceStore();
  const location = useLocation();

  useEffect(() => {
    setViewMode("platform");
    setActiveWorkspace(null);
  }, [location.pathname, setViewMode, setActiveWorkspace]);

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
