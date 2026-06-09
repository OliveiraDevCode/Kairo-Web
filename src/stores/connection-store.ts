import { create } from "zustand";
import { WsClient, type WsStatus } from "@/lib/websocket/ws-client";
import { configureApiClient } from "@/lib/api/api-client";
import { fetchHealth } from "@/lib/api/health";
import { fetchTables } from "@/lib/api/tables";
import { fetchLearningStats } from "@/lib/api/learning";
import { fetchMonitorHealth } from "@/lib/api/monitor";
import { useTableStore } from "./table-store";
import { useSnapshotStore } from "./snapshot-store";
import { useLearningStore } from "./learning-store";
import { useMonitorStore } from "./monitor-store";
import { logger } from "@/lib/logger";

type BackendStatus = "unknown" | "online" | "offline";

interface ConnectionStore {
  backendStatus: BackendStatus;
  wsStatus: WsStatus;
  tableCount: number;
  wsClient: WsClient | null;
  pollInterval: ReturnType<typeof setInterval> | null;

  start: (backendUrl: string, wsUrl: string) => void;
  stop: () => void;
}

const POLL_INTERVAL_MS = 3000;

export const useConnectionStore = create<ConnectionStore>((set, get) => ({
  backendStatus: "unknown",
  wsStatus: "disconnected",
  tableCount: 0,
  wsClient: null,
  pollInterval: null,

  start: (backendUrl, wsUrl) => {
    const state = get();
    if (state.pollInterval) return;

    configureApiClient({ baseUrl: backendUrl });

    const wsClient = new WsClient({ url: wsUrl });

    wsClient.onStatus((status) => {
      set({ wsStatus: status });
      logger.info(`[CONN] WebSocket: ${status}`);
    });

    wsClient.on("table:discovered", (event) => {
      if (event.type === "table:discovered") {
        useTableStore.getState().addTable(event.table);
        set({ tableCount: useTableStore.getState().tables.length });
      }
    });

    wsClient.on("table:closed", (event) => {
      if (event.type === "table:closed") {
        useTableStore.getState().removeTable(event.table_id);
        set({ tableCount: useTableStore.getState().tables.length });
      }
    });

    wsClient.on("snapshot:captured", (event) => {
      if (event.type === "snapshot:captured") {
        useSnapshotStore.getState().setSnapshot(event.table_id, event.snapshot);
        useSnapshotStore.getState().pushRecent(event.snapshot);
      }
    });

    wsClient.on("monitor:activity", (event) => {
      if (event.type === "monitor:activity") {
        useMonitorStore.getState().pushActivity(event.entry);
      }
    });

    wsClient.connect();
    set({ wsClient });

    async function poll() {
      try {
        await fetchHealth();
        set({ backendStatus: "online" });

        const tables = await fetchTables();
        useTableStore.getState().setTables(tables.tables);
        set({ tableCount: tables.total });

        const stats = await fetchLearningStats();
        useLearningStore.getState().setStats(stats);
        stats.activity_feed.forEach((entry) => {
          useMonitorStore.getState().pushActivity(entry);
        });

        const monHealth = await fetchMonitorHealth();
        useMonitorStore.getState().setHealth(monHealth);
      } catch (err) {
        logger.warn("[CONN] Poll failed", { error: String(err) });
        set({ backendStatus: "offline" });
      }
    }

    poll();
    const interval = setInterval(poll, POLL_INTERVAL_MS);
    set({ pollInterval: interval });
  },

  stop: () => {
    const state = get();
    if (state.pollInterval) {
      clearInterval(state.pollInterval);
    }
    state.wsClient?.disconnect();
    set({ pollInterval: null, wsClient: null, backendStatus: "unknown" });
  },
}));
