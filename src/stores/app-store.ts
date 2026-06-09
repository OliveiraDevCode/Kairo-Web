import { create } from "zustand";
import { AppLifecycleMachine, AppState, AppEventType } from "@/lib/startup";
import { useConnectionStore } from "./connection-store";
import { logger } from "@/lib/logger";

interface AppStore {
  appState: AppState;
  machine: AppLifecycleMachine;
  version: string;
  backendUrl: string;
  wsUrl: string;
  init: () => void;
  connect: () => void;
}

export const useAppStore = create<AppStore>((set, get) => {
  const machine = new AppLifecycleMachine();

  machine.subscribe((state, prev) => {
    set({ appState: state });
    logger.info(`[APP] ${prev} → ${state}`);
  });

  return {
    appState: machine.state,
    machine,
    version: "0.1.0",
    backendUrl: "http://localhost:8000",
    wsUrl: "ws://localhost:8000/ws",

    init: () => {
      machine.dispatch({ type: AppEventType.INIT });
      get().connect();
    },

    connect: () => {
      machine.dispatch({ type: AppEventType.CONNECT });
      const { backendUrl, wsUrl } = get();
      useConnectionStore.getState().start(backendUrl, wsUrl);

      // Once poll succeeds, transition to READY
      const unsub = useConnectionStore.subscribe((state, prev) => {
        if (prev.backendStatus !== "online" && state.backendStatus === "online") {
          get().machine.dispatch({ type: AppEventType.CONNECTED });
          unsub();
        }
      });
    },
  };
});
