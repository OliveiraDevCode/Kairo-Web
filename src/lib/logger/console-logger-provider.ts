import { LoggerLevel } from "./logger-level";
import type { LoggerProvider } from "./logger-provider";

export class ConsoleLoggerProvider implements LoggerProvider {
  readonly name = "console";
  enabled = true;

  log(level: LoggerLevel, message: string, metadata?: Record<string, unknown>): void {
    const ts = new Date().toISOString();
    const prefix = `[${ts}] [${level}]`;

    switch (level) {
      case LoggerLevel.DEBUG:
        console.debug(prefix, message, metadata ?? "");
        break;
      case LoggerLevel.INFO:
        console.info(prefix, message, metadata ?? "");
        break;
      case LoggerLevel.WARN:
        console.warn(prefix, message, metadata ?? "");
        break;
      case LoggerLevel.ERROR:
        console.error(prefix, message, metadata ?? "");
        break;
    }
  }
}
