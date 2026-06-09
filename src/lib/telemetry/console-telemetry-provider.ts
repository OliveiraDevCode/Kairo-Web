import type { TelemetryProvider } from "./telemetry-provider";
import type { TelemetryPayload } from "./telemetry-payload";
import { logger } from "../logger";

export class ConsoleTelemetryProvider implements TelemetryProvider {
  readonly name = "console";
  enabled = true;

  track(event: string, payload?: TelemetryPayload): void {
    logger.info("Telemetry event emitted", { event, payload, timestamp: new Date().toISOString() });
  }
}
