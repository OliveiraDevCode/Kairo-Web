import { Badge } from "@/components/ui/badge";

type ConnectionState = "unknown" | "online" | "offline" | "connected" | "connecting" | "disconnected" | "healthy" | "degraded" | "blocked";

const variants: Record<ConnectionState, "secondary" | "success" | "destructive" | "warning" | "outline"> = {
  unknown: "secondary",
  online: "success",
  offline: "destructive",
  connected: "success",
  connecting: "warning",
  disconnected: "destructive",
  healthy: "success",
  degraded: "warning",
  blocked: "destructive",
};

interface ConnectionBadgeProps {
  state: ConnectionState;
  label?: string;
}

export function ConnectionBadge({ state, label }: ConnectionBadgeProps) {
  const display = label ?? state;
  return <Badge variant={variants[state] ?? "secondary"}>{display}</Badge>;
}
