import type { TelemetryProvider } from "./telemetry-provider";
import type { TelemetryPayload } from "./telemetry-payload";

export class TelemetryService {
  private readonly providers: TelemetryProvider[] = [];

  register(provider: TelemetryProvider): void {
    this.providers.push(provider);
  }

  emit(event: string, payload?: TelemetryPayload): void {
    this.providers
      .filter((p) => p.enabled)
      .forEach((p) => p.track(event, payload));
  }
}
