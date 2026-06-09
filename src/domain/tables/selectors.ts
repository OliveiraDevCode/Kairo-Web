import { toTableCardInfo } from "./mappers";
import type { TableCardInfo } from "./models";
import type { TableInfo } from "@/types/table";

export function selectTableById(tables: TableInfo[], id: string | null): TableCardInfo | null {
  if (!id) return null;
  const dto = tables.find((t) => t.id === id);
  return dto ? toTableCardInfo(dto) : null;
}
