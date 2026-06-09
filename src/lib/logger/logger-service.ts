import { LoggerLevel } from "./logger-level";
import type { LoggerProvider } from "./logger-provider";

export class LoggerService {
  private readonly providers: LoggerProvider[] = [];

  register(provider: LoggerProvider): void {
    this.providers.push(provider);
  }

  private write(level: LoggerLevel, message: string, metadata?: Record<string, unknown>): void {
    this.providers
      .filter((p) => p.enabled)
      .forEach((p) => p.log(level, message, metadata));
  }

  debug(message: string, metadata?: Record<string, unknown>): void {
    this.write(LoggerLevel.DEBUG, message, metadata);
  }

  info(message: string, metadata?: Record<string, unknown>): void {
    this.write(LoggerLevel.INFO, message, metadata);
  }

  warn(message: string, metadata?: Record<string, unknown>): void {
    this.write(LoggerLevel.WARN, message, metadata);
  }

  error(message: string, metadata?: Record<string, unknown>): void {
    this.write(LoggerLevel.ERROR, message, metadata);
  }
}
