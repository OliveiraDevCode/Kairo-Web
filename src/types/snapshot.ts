import type { SeatInfo } from "./table";

export interface LiveTableSnapshot {
  table_name: string;
  screenshot_timestamp: number;
  image_path: string | null;
  source: "hand_history" | "live_capture";
  trace_id: string;
  detected_players: number;
  hero_name: string;
  detection_status: "pending" | "detecting" | "partial" | "complete" | "failed";
  max_seats: number;
  players: SeatInfo[];
  hero_cards: string[];
  board_cards: string[];
  pot: number;
  dealer_pos: number;
}
