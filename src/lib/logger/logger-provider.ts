import { LoggerLevel } from "./logger-level";

export interface LoggerProvider {
  readonly name: string;
  enabled: boolean;
  log(level: LoggerLevel, message: string, metadata?: Record<string, unknown>): void;
}
