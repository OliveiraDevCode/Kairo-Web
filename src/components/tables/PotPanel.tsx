interface PotPanelProps {
  pot: number;
  heroStack: number;
}

export function PotPanel({ pot, heroStack }: PotPanelProps) {
  return (
    <div className="flex items-center gap-6">
      <div>
        <p className="text-xs text-muted-foreground">Pot</p>
        <p className="text-lg font-bold text-success">${pot.toFixed(2)}</p>
      </div>
      <div>
        <p className="text-xs text-muted-foreground">Stack</p>
        <p className="text-lg font-bold">${heroStack.toFixed(2)}</p>
      </div>
    </div>
  );
}
