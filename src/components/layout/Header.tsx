import { Badge } from "@/components/ui/badge";
import { useConnectionStore } from "@/stores/connection-store";

const backendVariant = {
  unknown: "secondary" as const,
  online: "success" as const,
  offline: "destructive" as const,
};

const wsVariant: Record<string, "success" | "warning" | "destructive" | "secondary"> = {
  connected: "success",
  connecting: "warning",
  disconnected: "destructive",
};

export function Header() {
  const backendStatus = useConnectionStore((s) => s.backendStatus);
  const wsStatus = useConnectionStore((s) => s.wsStatus);
  const tableCount = useConnectionStore((s) => s.tableCount);

  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-card px-6">
      <div className="text-sm font-medium">Dashboard</div>

      <div className="flex items-center gap-3">
        <Badge variant={backendVariant[backendStatus]}>
          Backend: {backendStatus}
        </Badge>

        <Badge variant={wsVariant[wsStatus] ?? "secondary"}>
          WS: {wsStatus}
        </Badge>

        <Badge variant="secondary">
          Tables: {tableCount}
        </Badge>
      </div>
    </header>
  );
}
