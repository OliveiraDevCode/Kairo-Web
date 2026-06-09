export interface TableCardInfo {
  id: string;
  name: string;
  room: string;
  phase: string;
  heroCards: string[];
  board: string[];
  pot: number;
  heroStack: number;
  heroSeat: number;
  dealerPos: number;
  activePlayers: number;
  maxSeats: number;
  heroTurn: boolean;
  handCount: number;
  opponentNames: string[];
}

export interface SeatInfo {
  seat: number;
  playerName: string;
  stack: number;
  isHero: boolean;
  isDealer: boolean;
  sittingOut: boolean;
}

export function inferRoom(tableName: string): string {
  if (tableName.includes("PokerStars")) return "PokerStars";
  if (tableName.includes("GGPoker")) return "GGPoker";
  if (tableName.includes("PartyPoker")) return "PartyPoker";
  if (tableName.includes("888")) return "888";
  return "Unknown";
}
