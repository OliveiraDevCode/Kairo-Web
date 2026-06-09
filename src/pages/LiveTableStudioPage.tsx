import { useEffect, useMemo } from "react";
import { useTableStore } from "@/stores/table-store";
import { useSnapshotStore } from "@/stores/snapshot-store";
import { useMonitorStore } from "@/stores/monitor-store";
import { telemetry } from "@/lib/telemetry";
import { selectTableById } from "@/domain/tables";
import { selectLatestSnapshot, selectSnapshotAge } from "@/domain/snapshots";
import { TableCard } from "@/components/tables/TableCard";
import { HeroCardsPanel } from "@/components/tables/HeroCardsPanel";
import { BoardPanel } from "@/components/tables/BoardPanel";
import { PotPanel } from "@/components/tables/PotPanel";
import { PlayerPanel } from "@/components/tables/PlayerPanel";
import { EventTimeline } from "@/components/tables/EventTimeline";
import { Badge } from "@/components/ui/badge";

export default function LiveTableStudioPage() {
  const tables = useTableStore((s) => s.tables);
  const selectedId = useTableStore((s) => s.selectedId);
  const selectTable = useTableStore((s) => s.selectTable);
  const snapshots = useSnapshotStore((s) => s.snapshots);
  const recentSnapshots = useSnapshotStore((s) => s.recent);
  const activityFeed = useMonitorStore((s) => s.activityFeed);

  const selectedTable = useMemo(
    () => selectTableById(tables, selectedId),
    [tables, selectedId],
  );

  const snapshot = useMemo(
    () => selectLatestSnapshot(snapshots, selectedId),
    [snapshots, selectedId],
  );

  const snapshotAge = useMemo(
    () => selectSnapshotAge(snapshot),
    [snapshot],
  );

  const snapshotCount = useMemo(
    () => (selectedId ? recentSnapshots.filter((s) => s.table_name === selectedTable?.name).length : 0),
    [selectedId, recentSnapshots, selectedTable?.name],
  );

  useEffect(() => {
    telemetry.emit("live_table_loaded", { timestamp: Date.now() });
  }, []);

  useEffect(() => {
    if (selectedId) {
      telemetry.emit("table_selected", { tableId: selectedId, timestamp: Date.now() });
    }
  }, [selectedId]);

  useEffect(() => {
    if (snapshot) {
      telemetry.emit("snapshot_updated", {
        tableId: selectedId,
        age: snapshotAge,
        timestamp: Date.now(),
      });
    }
  }, [snapshot?.timestamp]);

  return (
    <div className="flex h-full gap-6">
      {/* Table selector sidebar */}
      <aside className="w-72 shrink-0 space-y-2 overflow-y-auto">
        <div className="mb-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Tables</h2>
          <p className="text-xs text-muted-foreground">{tables.length} detected</p>
        </div>
        {tables.length === 0 && (
          <p className="text-sm text-muted-foreground">No tables detected.</p>
        )}
        {tables.map((t) => (
          <TableCard
            key={t.id}
            table={{
              id: t.id,
              name: t.name,
              room: t.name.includes("PokerStars") ? "PokerStars" : "Unknown",
              phase: t.phase,
              heroCards: t.hero_cards,
              board: t.board,
              pot: t.pot,
              heroStack: t.hero_stack,
              heroSeat: t.hero_seat,
              dealerPos: t.dealer_pos,
              activePlayers: t.active_players,
              maxSeats: t.max_seats,
              heroTurn: t.is_hero_turn,
              handCount: t.hand_count,
              opponentNames: t.opponent_names,
            }}
            selected={t.id === selectedId}
            onClick={() => selectTable(t.id === selectedId ? null : t.id)}
          />
        ))}
      </aside>

      {/* Main content */}
      <div className="flex-1 space-y-6 overflow-y-auto">
        {!selectedTable && (
          <div className="flex items-center justify-center h-64 text-sm text-muted-foreground">
            Select a table from the sidebar to view details
          </div>
        )}

        {selectedTable && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold">{selectedTable.name}</h1>
                <p className="text-sm text-muted-foreground">
                  {selectedTable.room} · {selectedTable.activePlayers}/{selectedTable.maxSeats} players · {selectedTable.handCount} hands
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge>{selectedTable.phase}</Badge>
                {snapshot && <Badge variant="outline">{snapshot.source}</Badge>}
              </div>
            </div>

            {/* Cards row */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Hero Cards</p>
                <HeroCardsPanel cards={selectedTable.heroCards} />
              </div>
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Board</p>
                <BoardPanel cards={selectedTable.board} />
              </div>
            </div>

            {/* Pot + Stack */}
            <PotPanel pot={selectedTable.pot} heroStack={selectedTable.heroStack} />

            {/* Players */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Players</p>
                {snapshot && (
                  <p className="text-xs text-muted-foreground">
                    Snapshot {snapshotAge} · #{snapshotCount} received
                  </p>
                )}
              </div>
              <PlayerPanel
                players={snapshot?.players ?? []}
              />
            </div>

            {/* Snapshot info */}
            {snapshot && (
              <div className="text-xs text-muted-foreground space-y-1 border-t border-border pt-4">
                <p>Trace: <span className="font-mono">{snapshot.traceId}</span></p>
                <p>Detection: {snapshot.detectionStatus} · {snapshot.detectedPlayers} players detected</p>
                <p>Max seats: {snapshot.maxSeats}</p>
              </div>
            )}
          </>
        )}

        {/* Event Timeline - always visible */}
        <div className="border-t border-border pt-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Recent Events</p>
          <EventTimeline events={activityFeed} />
        </div>
      </div>
    </div>
  );
}
