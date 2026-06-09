import { create } from "zustand";
import type { PipelineHealth } from "@/types/monitor";

interface MonitorStore {
  health: PipelineHealth | null;
  activityFeed: string[];
  setHealth: (health: PipelineHealth) => void;
  pushActivity: (entry: string) => void;
}

export const useMonitorStore = create<MonitorStore>((set) => ({
  health: null,
  activityFeed: [],

  setHealth: (health) => set({ health }),

  pushActivity: (entry) =>
    set((state) => ({
      activityFeed: [entry, ...state.activityFeed].slice(0, 50),
    })),
}));
