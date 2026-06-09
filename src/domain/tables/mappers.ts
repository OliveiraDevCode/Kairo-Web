import type { TableInfo } from "@/types/table";
import type { TableCardInfo, SeatInfo } from "./models";
import { inferRoom } from "./models";

export function toTableCardInfo(dto: TableInfo): TableCardInfo {
  return {
    id: dto.id,
    name: dto.name,
    room: inferRoom(dto.name),
    phase: dto.phase,
    heroCards: dto.hero_cards,
    board: dto.board,
    pot: dto.pot,
    heroStack: dto.hero_stack,
    heroSeat: dto.hero_seat,
    dealerPos: dto.dealer_pos,
    activePlayers: dto.active_players,
    maxSeats: dto.max_seats,
    heroTurn: dto.is_hero_turn,
    handCount: dto.hand_count,
    opponentNames: dto.opponent_names,
  };
}

export function toSeatInfo(dto: {
  seat: number;
  player_name: string;
  stack: number;
  is_hero: boolean;
  is_dealer: boolean;
  sitting_out: boolean;
}): SeatInfo {
  return {
    seat: dto.seat,
    playerName: dto.player_name,
    stack: dto.stack,
    isHero: dto.is_hero,
    isDealer: dto.is_dealer,
    sittingOut: dto.sitting_out,
  };
}
