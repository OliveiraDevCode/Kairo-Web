import type { SeatInfo } from "@/domain/tables";
import { cn } from "@/lib/utils";

interface PlayerPanelProps {
  players: SeatInfo[];
}

export function PlayerPanel({ players }: PlayerPanelProps) {
  if (players.length === 0) {
    return <p className="text-sm text-muted-foreground">No player data</p>;
  }

  return (
    <div className="space-y-1.5">
      {players.map((p, i) => (
        <div
          key={i}
          className={cn(
            "flex items-center justify-between rounded-md px-3 py-2 text-sm border",
            p.isHero ? "border-primary/40 bg-primary/5" : "border-border",
          )}
        >
          <div className="flex items-center gap-2">
            {p.isDealer && <span className="text-xs text-muted-foreground">🎯</span>}
            <span className={cn("font-medium", p.isHero && "text-primary")}>
              {p.playerName}
            </span>
            {p.isHero && <span className="text-xs text-muted-foreground">(you)</span>}
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>Seat {p.seat}</span>
            <span className="font-medium text-foreground">${p.stack.toFixed(2)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
