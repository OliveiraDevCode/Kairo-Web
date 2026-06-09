export interface TableInfo {
  id: string;
  name: string;
  hwnd: number;
  phase: string;
  hero_name: string;
  hero_cards: string[];
  board: string[];
  pot: number;
  hero_stack: number;
  hero_seat: number;
  dealer_pos: number;
  active_players: number;
  opponent_names: string[];
  hand_count: number;
  is_hero_turn: boolean;
  max_seats: number;
}

export interface SeatInfo {
  seat: number;
  player_name: string;
  stack: number;
  is_hero: boolean;
  is_dealer: boolean;
  sitting_out: boolean;
}
