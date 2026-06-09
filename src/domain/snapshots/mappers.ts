import type { LiveTableSnapshot } from "@/types/snapshot";
import type { SnapshotDetail } from "./models";
import { toSeatInfo } from "@/domain/tables";

export function toSnapshotDetail(dto: LiveTableSnapshot): SnapshotDetail {
  return {
    tableName: dto.table_name,
    timestamp: dto.screenshot_timestamp,
    source: dto.source,
    traceId: dto.trace_id,
    detectionStatus: dto.detection_status,
    detectedPlayers: dto.detected_players,
    maxSeats: dto.max_seats,
    players: (dto.players ?? []).map(toSeatInfo),
    heroCards: dto.hero_cards ?? [],
    boardCards: dto.board_cards ?? [],
    pot: dto.pot ?? 0,
    dealerPos: dto.dealer_pos ?? -1,
  };
}
