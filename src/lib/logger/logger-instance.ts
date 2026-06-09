import { ConsoleLoggerProvider } from "./console-logger-provider";
import { LoggerService } from "./logger-service";

export const logger = new LoggerService();
logger.register(new ConsoleLoggerProvider());
