import type { LiveTableSnapshot } from "./snapshot";
import type { TableInfo } from "./table";

export type ServerEvent =
  | { type: "table:discovered"; table: TableInfo }
  | { type: "table:closed"; table_id: string; table_name: string }
  | { type: "snapshot:captured"; table_id: string; snapshot: LiveTableSnapshot }
  | { type: "learning:progress"; job_id: string; progress: number; stage: string }
  | { type: "learning:model_saved"; name: string; version: string }
  | { type: "monitor:health_changed"; health: { status: string; detail: string } }
  | { type: "monitor:bottleneck"; bottleneck: string }
  | { type: "monitor:activity"; entry: string };

export type ClientCommand =
  | { type: "subscribe"; table_id?: string }
  | { type: "unsubscribe"; table_id?: string }
  | { type: "ping" };
