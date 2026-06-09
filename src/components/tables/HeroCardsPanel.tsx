interface HeroCardsPanelProps {
  cards: string[];
}

export function HeroCardsPanel({ cards }: HeroCardsPanelProps) {
  if (cards.length === 0) {
    return <span className="text-muted-foreground text-sm">--</span>;
  }

  return (
    <div className="flex items-center gap-2">
      {cards.map((card, i) => {
        const suit = card.endsWith("h") || card.endsWith("d") ? "text-red-400" : "text-foreground";
        return (
          <span
            key={i}
            className={`inline-flex items-center justify-center w-10 h-14 rounded-md border border-border bg-card text-sm font-bold ${suit}`}
          >
            {card}
          </span>
        );
      })}
    </div>
  );
}
