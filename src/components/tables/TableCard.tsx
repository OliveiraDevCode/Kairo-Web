import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { TableCardInfo } from "@/domain/tables";

const phaseVariant: Record<string, "secondary" | "warning" | "default" | "outline" | "destructive" | "success"> = {
  preflop: "warning",
  flop: "default",
  turn: "default",
  river: "default",
  showdown: "secondary",
  idle: "secondary",
};

interface TableCardProps {
  table: TableCardInfo;
  selected: boolean;
  onClick: () => void;
}

export function TableCard({ table, selected, onClick }: TableCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left rounded-lg border bg-card px-4 py-3 transition-colors hover:bg-accent",
        selected ? "ring-2 ring-primary border-primary" : "border-border",
      )}
    >
      <div className="flex items-center justify-between">
        <div className="min-w-0">
          <p className="font-medium truncate">{table.name}</p>
          <p className="text-xs text-muted-foreground">{table.room}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Badge variant={phaseVariant[table.phase] ?? "secondary"}>{table.phase}</Badge>
          <span className="text-xs text-muted-foreground">{table.activePlayers}/{table.maxSeats}</span>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
        <span>${table.pot.toFixed(2)}</span>
        <span>{table.handCount} hands</span>
        {table.heroTurn && <span className="text-success font-medium">Your turn</span>}
      </div>
    </button>
  );
}
