import { create } from "zustand";
import type { ViewMode } from "@/core/types/platform";

interface PlatformStore {
  viewMode: ViewMode;
  sidebarCollapsed: boolean;
  setViewMode: (mode: ViewMode) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

export const usePlatformStore = create<PlatformStore>((set) => ({
  viewMode: "platform",
  sidebarCollapsed: false,

  setViewMode: (mode) => set({ viewMode: mode }),

  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
}));
