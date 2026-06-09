export enum AppState {
  BOOT = "BOOT",
  SPLASH = "SPLASH",
  CONNECTING = "CONNECTING",
  READY = "READY",
  ERROR = "ERROR",
}

export enum AppEventType {
  INIT = "INIT",
  CONNECT = "CONNECT",
  CONNECTED = "CONNECTED",
  DISCONNECTED = "DISCONNECTED",
  FAIL = "FAIL",
  RETRY = "RETRY",
}

export interface AppEvent {
  type: AppEventType;
  payload?: Record<string, unknown>;
}

export type TransitionGuard = (state: AppState, event: AppEvent) => boolean;

export interface AppTransition {
  from: AppState;
  event: AppEventType;
  to: AppState;
  guard?: TransitionGuard;
}

export const APP_TRANSITIONS: AppTransition[] = [
  { from: AppState.BOOT, event: AppEventType.INIT, to: AppState.SPLASH },
  { from: AppState.SPLASH, event: AppEventType.CONNECT, to: AppState.CONNECTING },
  { from: AppState.CONNECTING, event: AppEventType.CONNECTED, to: AppState.READY },
  { from: AppState.CONNECTING, event: AppEventType.FAIL, to: AppState.ERROR },
  { from: AppState.ERROR, event: AppEventType.RETRY, to: AppState.CONNECTING },
  { from: AppState.READY, event: AppEventType.DISCONNECTED, to: AppState.ERROR },
];

export class AppLifecycleMachine {
  private _state: AppState = AppState.BOOT;
  private listeners: Array<(state: AppState, prev: AppState) => void> = [];

  get state(): AppState {
    return this._state;
  }

  subscribe(listener: (state: AppState, prev: AppState) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  dispatch(event: AppEvent): boolean {
    const transition = APP_TRANSITIONS.find(
      (t) => t.from === this._state && t.event === event.type,
    );
    if (!transition) return false;
    if (transition.guard && !transition.guard(this._state, event)) return false;

    const prev = this._state;
    this._state = transition.to;
    this.listeners.forEach((l) => l(this._state, prev));
    return true;
  }

  reset(): void {
    this._state = AppState.BOOT;
  }
}
