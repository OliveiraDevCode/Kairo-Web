interface BoardPanelProps {
  cards: string[];
}

export function BoardPanel({ cards }: BoardPanelProps) {
  if (cards.length === 0) {
    return <span className="text-muted-foreground text-sm">No board dealt</span>;
  }

  return (
    <div className="flex items-center gap-1.5">
      {cards.map((card, i) => {
        const suit = card.endsWith("h") || card.endsWith("d") ? "text-red-400" : "text-foreground";
        return (
          <span
            key={i}
            className={`inline-flex items-center justify-center w-9 h-12 rounded-md border border-border bg-card text-xs font-bold ${suit}`}
          >
            {card}
          </span>
        );
      })}
    </div>
  );
}
