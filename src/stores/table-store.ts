import { create } from "zustand";
import type { TableInfo } from "@/types/table";

interface TableStore {
  tables: TableInfo[];
  selectedId: string | null;
  setTables: (tables: TableInfo[]) => void;
  addTable: (table: TableInfo) => void;
  removeTable: (tableId: string) => void;
  selectTable: (id: string | null) => void;
}

export const useTableStore = create<TableStore>((set) => ({
  tables: [],
  selectedId: null,

  setTables: (tables) => set({ tables }),

  addTable: (table) =>
    set((state) => ({
      tables: state.tables.some((t) => t.id === table.id)
        ? state.tables.map((t) => (t.id === table.id ? table : t))
        : [...state.tables, table],
    })),

  removeTable: (tableId) =>
    set((state) => ({
      tables: state.tables.filter((t) => t.id !== tableId),
      selectedId: state.selectedId === tableId ? null : state.selectedId,
    })),

  selectTable: (id) => set({ selectedId: id }),
}));
