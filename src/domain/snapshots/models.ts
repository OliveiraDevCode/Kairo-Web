import type { SeatInfo } from "@/domain/tables";

export interface SnapshotDetail {
  tableName: string;
  timestamp: number;
  source: "hand_history" | "live_capture";
  traceId: string;
  detectionStatus: string;
  detectedPlayers: number;
  maxSeats: number;
  players: SeatInfo[];
  heroCards: string[];
  boardCards: string[];
  pot: number;
  dealerPos: number;
}

export type DetectionStatus = "pending" | "detecting" | "partial" | "complete" | "failed";
