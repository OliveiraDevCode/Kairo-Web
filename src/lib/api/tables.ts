import { api } from "./api-client";
import type { TableInfo } from "@/types/table";

interface TablesResponse {
  tables: TableInfo[];
  total: number;
}

export function fetchTables(): Promise<TablesResponse> {
  return api.get<TablesResponse>("/api/v1/tables");
}
