import { ConsoleTelemetryProvider } from "./console-telemetry-provider";
import { TelemetryService } from "./telemetry-service";

export const telemetry = new TelemetryService();
telemetry.register(new ConsoleTelemetryProvider());
