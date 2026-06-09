import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string | number;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
  className?: string;
}

export function MetricCard({ label, value, trend, trendDirection, className }: MetricCardProps) {
  const trendColor =
    trendDirection === "up" ? "text-success" :
    trendDirection === "down" ? "text-error" :
    "text-muted-foreground";

  return (
    <Card className={cn("", className)}>
      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
        <p className="text-xl font-bold mt-1">{value}</p>
        {trend && <p className={cn("text-xs mt-1", trendColor)}>{trend}</p>}
      </CardContent>
    </Card>
  );
}
