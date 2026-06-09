import { create } from "zustand";
import type { LiveTableSnapshot } from "@/types/snapshot";

interface SnapshotStore {
  snapshots: Record<string, LiveTableSnapshot>;
  recent: LiveTableSnapshot[];
  setSnapshot: (tableId: string, snapshot: LiveTableSnapshot) => void;
  pushRecent: (snapshot: LiveTableSnapshot) => void;
}

const MAX_RECENT = 50;

export const useSnapshotStore = create<SnapshotStore>((set) => ({
  snapshots: {},
  recent: [],

  setSnapshot: (tableId, snapshot) =>
    set((state) => ({
      snapshots: { ...state.snapshots, [tableId]: snapshot },
    })),

  pushRecent: (snapshot) =>
    set((state) => ({
      recent: [snapshot, ...state.recent].slice(0, MAX_RECENT),
    })),
}));
