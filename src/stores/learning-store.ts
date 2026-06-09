import { create } from "zustand";
import type { LearningStats } from "@/types/learning";

interface LearningStore {
  stats: LearningStats | null;
  setStats: (stats: LearningStats) => void;
}

export const useLearningStore = create<LearningStore>((set) => ({
  stats: null,

  setStats: (stats) => set({ stats }),
}));
