import { NavLink, useNavigate, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { usePlatformStore } from "@/core/stores/platform-store";
import { useWorkspaceStore } from "@/core/stores/workspace-store";
import { Button } from "@/core/ui/button";
import { StatusDot } from "@/core/ui/status-dot";
import {
  LayoutDashboard,
  FolderKanban,
  FlaskConical,
  Brain,
  Settings,
  ArrowLeft,
  Activity,
  BookOpen,
  Cable,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

const platformNav: NavItem[] = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/workspaces", label: "Workspaces", icon: FolderKanban },
  { to: "/learning-lab", label: "Learning Lab", icon: FlaskConical },
  { to: "/knowledge", label: "Knowledge", icon: Brain },
  { to: "/settings", label: "Settings", icon: Settings },
];

const workspaceNav: NavItem[] = [
  { to: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "activity", label: "Activity", icon: Activity },
  { to: "knowledge", label: "Knowledge", icon: BookOpen },
  { to: "learning", label: "Learning", icon: FlaskConical },
  { to: "sources", label: "Sources", icon: Cable },
  { to: "settings", label: "Settings", icon: Settings },
];

function NavItemLink({ item, isActive: checkActive }: { item: NavItem; isActive: (path: string) => boolean }) {
  return (
    <NavLink
      to={item.to}
      end={item.to === "/dashboard" || item.to === "dashboard"}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          isActive || checkActive(item.to)
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        )
      }
    >
      <item.icon className="size-4 shrink-0" />
      <span>{item.label}</span>
    </NavLink>
  );
}

export function Sidebar() {
  const { viewMode, sidebarCollapsed, toggleSidebar, setViewMode } = usePlatformStore();
  const { workspaces, activeWorkspaceId } = useWorkspaceStore();
  const navigate = useNavigate();
  const params = useParams();

  const activeWorkspace = workspaces.find((w) => w.id === activeWorkspaceId);

  const handleBackToPlatform = () => {
    setViewMode("platform");
    navigate("/dashboard");
  };

  const workspaceBase = activeWorkspaceId
    ? `/workspaces/${activeWorkspaceId}`
    : "";

  const checkActive = (path: string) => {
    const locationPath = window.location.pathname;
    if (viewMode === "workspace" && workspaceBase) {
      return locationPath === `${workspaceBase}/${path}`;
    }
    return false;
  };

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-border bg-card transition-all duration-200",
        sidebarCollapsed ? "w-16" : "w-56",
      )}
    >
      <div className="flex h-14 items-center gap-2 border-b border-border px-4">
        <div className="flex size-3 shrink-0 items-center justify-center rounded-full bg-primary" />
        {!sidebarCollapsed && (
          <span className="font-bold tracking-tight">Kairo</span>
        )}
        <button
          onClick={toggleSidebar}
          className={cn(
            "ml-auto rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            sidebarCollapsed && "mx-auto",
          )}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="size-4" />
          ) : (
            <ChevronLeft className="size-4" />
          )}
        </button>
      </div>

      {viewMode === "workspace" && !sidebarCollapsed && (
        <div className="border-b border-border px-4 py-3">
          <button
            onClick={handleBackToPlatform}
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3" />
            Platform
          </button>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-base">{activeWorkspace?.icon ?? "📂"}</span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                {activeWorkspace?.name ?? "Workspace"}
              </p>
              <div className="flex items-center gap-1.5">
                <StatusDot
                  color={
                    activeWorkspace?.status === "running"
                      ? "success"
                      : activeWorkspace?.status === "error"
                        ? "error"
                        : "idle"
                  }
                  pulse={activeWorkspace?.status === "running"}
                />
                <span className="text-xs text-muted-foreground capitalize">
                  {activeWorkspace?.status ?? "idle"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <nav className="flex-1 space-y-1 p-3">
        {viewMode === "platform" &&
          platformNav.map((item) => (
            <NavItemLink key={item.to} item={item} isActive={(path) => window.location.pathname === path} />
          ))}
        {viewMode === "workspace" &&
          workspaceNav.map((item) => (
            <NavItemLink
              key={item.to}
              item={{ ...item, to: `${workspaceBase}/${item.to}` }}
              isActive={checkActive}
            />
          ))}
      </nav>

      {!sidebarCollapsed && (
        <div className="border-t border-border p-3 text-xs text-muted-foreground">
          <p>Kairo v0.2.0</p>
        </div>
      )}
    </aside>
  );
}
