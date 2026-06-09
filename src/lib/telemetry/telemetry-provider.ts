import type { TelemetryPayload } from "./telemetry-payload";

export interface TelemetryProvider {
  readonly name: string;
  enabled: boolean;
  track(event: string, payload?: TelemetryPayload): void;
}
