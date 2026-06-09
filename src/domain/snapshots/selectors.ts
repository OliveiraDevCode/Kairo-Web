import { toSnapshotDetail } from "./mappers";
import type { SnapshotDetail } from "./models";
import type { LiveTableSnapshot } from "@/types/snapshot";

export function selectLatestSnapshot(
  snapshots: Record<string, LiveTableSnapshot>,
  tableId: string | null,
): SnapshotDetail | null {
  if (!tableId) return null;
  const dto = snapshots[tableId];
  return dto ? toSnapshotDetail(dto) : null;
}

export function selectSnapshotAge(snapshot: SnapshotDetail | null): string {
  if (!snapshot || snapshot.timestamp <= 0) return "--";
  const age = Date.now() / 1000 - snapshot.timestamp;
  if (age < 1) return "just now";
  if (age < 60) return `${Math.round(age)}s ago`;
  if (age < 3600) return `${Math.round(age / 60)}m ago`;
  return `${Math.round(age / 3600)}h ago`;
}
