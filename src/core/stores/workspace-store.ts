import { create } from "zustand";
import type { Workspace } from "@/core/types/workspace";

interface WorkspaceStore {
  workspaces: Workspace[];
  activeWorkspaceId: string | null;
  setActiveWorkspace: (id: string | null) => void;
  addWorkspace: (workspace: Workspace) => void;
  removeWorkspace: (id: string) => void;
  updateWorkspace: (id: string, updates: Partial<Workspace>) => void;
}

const DEFAULT_WORKSPACES: Workspace[] = [
  {
    id: "ws-1",
    name: "My Workspace",
    description: "Your default workspace",
    icon: "📂",
    status: "idle",
    createdAt: "2026-06-01",
    uptime: "0m",
    sourceCount: 0,
    eventCount: 0,
  },
  {
    id: "ws-2",
    name: "Research Lab",
    description: "Experiments and model training",
    icon: "🔬",
    status: "running",
    createdAt: "2026-06-05",
    uptime: "2h 34m",
    sourceCount: 2,
    eventCount: 847,
  },
  {
    id: "ws-3",
    name: "Automation Hub",
    description: "Scheduled tasks and pipelines",
    icon: "🤖",
    status: "idle",
    createdAt: "2026-06-07",
    uptime: "0m",
    sourceCount: 1,
    eventCount: 156,
  },
];

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  workspaces: DEFAULT_WORKSPACES,
  activeWorkspaceId: null,

  setActiveWorkspace: (id) => set({ activeWorkspaceId: id }),

  addWorkspace: (workspace) =>
    set((state) => ({ workspaces: [...state.workspaces, workspace] })),

  removeWorkspace: (id) =>
    set((state) => ({
      workspaces: state.workspaces.filter((w) => w.id !== id),
      activeWorkspaceId:
        state.activeWorkspaceId === id ? null : state.activeWorkspaceId,
    })),

  updateWorkspace: (id, updates) =>
    set((state) => ({
      workspaces: state.workspaces.map((w) =>
        w.id === id ? { ...w, ...updates } : w,
      ),
    })),
}));
