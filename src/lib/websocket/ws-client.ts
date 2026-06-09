import { logger } from "@/lib/logger";
import type { ServerEvent, ClientCommand } from "@/types/events";

export type WsStatus = "disconnected" | "connecting" | "connected";

export interface WsConfig {
  url: string;
  reconnectDelay: number;
  maxReconnectDelay: number;
  heartbeatInterval: number;
}

const DEFAULT_CONFIG: WsConfig = {
  url: "ws://localhost:8000/ws",
  reconnectDelay: 1000,
  maxReconnectDelay: 30_000,
  heartbeatInterval: 10_000,
};

type EventHandler = (event: ServerEvent) => void;
type StatusHandler = (status: WsStatus) => void;

export class WsClient {
  private ws: WebSocket | null = null;
  private config: WsConfig;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private heartbeatTimer: ReturnType<typeof setInterval> | null = null;
  private currentDelay: number;
  private _status: WsStatus = "disconnected";
  private manualClose = false;

  private eventHandlers: Map<string, Set<EventHandler>> = new Map();
  private statusHandlers: Set<StatusHandler> = new Set();

  constructor(config?: Partial<WsConfig>) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.currentDelay = this.config.reconnectDelay;
  }

  get status(): WsStatus {
    return this._status;
  }

  connect(): void {
    if (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) {
      return;
    }
    this.manualClose = false;
    this.setStatus("connecting");

    try {
      this.ws = new WebSocket(this.config.url);
    } catch (err) {
      logger.error("[WS] Failed to create WebSocket", { error: String(err) });
      this.scheduleReconnect();
      return;
    }

    this.ws.onopen = () => {
      logger.info("[WS] Connected");
      this.currentDelay = this.config.reconnectDelay;
      this.setStatus("connected");
      this.startHeartbeat();
    };

    this.ws.onclose = () => {
      logger.info("[WS] Disconnected");
      this.setStatus("disconnected");
      this.stopHeartbeat();
      if (!this.manualClose) {
        this.scheduleReconnect();
      }
    };

    this.ws.onerror = (err) => {
      logger.warn("[WS] Error", { error: String(err) });
    };

    this.ws.onmessage = (msg) => {
      try {
        const event = JSON.parse(msg.data) as ServerEvent;
        this.dispatchEvent(event);
      } catch (err) {
        logger.warn("[WS] Failed to parse message", { error: String(err), data: msg.data });
      }
    };
  }

  disconnect(): void {
    this.manualClose = true;
    this.stopHeartbeat();
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.setStatus("disconnected");
  }

  send(command: ClientCommand): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(command));
    } else {
      logger.warn("[WS] Cannot send — not connected", { command: command.type });
    }
  }

  on(eventType: string, handler: EventHandler): () => void {
    if (!this.eventHandlers.has(eventType)) {
      this.eventHandlers.set(eventType, new Set());
    }
    this.eventHandlers.get(eventType)!.add(handler);
    return () => {
      this.eventHandlers.get(eventType)?.delete(handler);
    };
  }

  onStatus(handler: StatusHandler): () => void {
    this.statusHandlers.add(handler);
    return () => this.statusHandlers.delete(handler);
  }

  private setStatus(status: WsStatus): void {
    this._status = status;
    this.statusHandlers.forEach((h) => h(status));
  }

  private dispatchEvent(event: ServerEvent): void {
    const handlers = this.eventHandlers.get(event.type);
    if (handlers) {
      handlers.forEach((h) => h(event));
    }
    // Also dispatch wildcard
    const wildcard = this.eventHandlers.get("*");
    if (wildcard) {
      wildcard.forEach((h) => h(event));
    }
  }

  private scheduleReconnect(): void {
    if (this.reconnectTimer) return;
    logger.info(`[WS] Reconnecting in ${this.currentDelay}ms`);
    this.setStatus("connecting");
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.currentDelay = Math.min(this.currentDelay * 2, this.config.maxReconnectDelay);
      this.connect();
    }, this.currentDelay);
  }

  private startHeartbeat(): void {
    this.stopHeartbeat();
    this.heartbeatTimer = setInterval(() => {
      this.send({ type: "ping" });
    }, this.config.heartbeatInterval);
  }

  private stopHeartbeat(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }
}
