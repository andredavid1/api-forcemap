import { ILogger, LogLevel, LogContext, LogEntry } from "@domain/services";

/**
 * Implementação do logger usando console nativo do Node.js
 *
 * Esta implementação:
 * - Usa console.error, console.warn, console.info, console.debug
 * - Formata logs em JSON estruturado
 * - Adiciona timestamp automático
 * - Suporta contexto enriquecido
 * - Permite logging de erros com stack trace
 */
export class ConsoleLogger implements ILogger {
  private readonly baseContext: LogContext;

  constructor(baseContext: LogContext = {}) {
    this.baseContext = baseContext;
  }

  public error(message: string, error?: Error, context?: LogContext): void {
    const logEntry = this.createLogEntry(
      LogLevel.ERROR,
      message,
      context,
      error,
    );
    console.error(this.formatLogEntry(logEntry));
  }

  public warn(message: string, context?: LogContext): void {
    const logEntry = this.createLogEntry(LogLevel.WARN, message, context);
    console.warn(this.formatLogEntry(logEntry));
  }

  public info(message: string, context?: LogContext): void {
    const logEntry = this.createLogEntry(LogLevel.INFO, message, context);
    console.info(this.formatLogEntry(logEntry));
  }

  public debug(message: string, context?: LogContext): void {
    const logEntry = this.createLogEntry(LogLevel.DEBUG, message, context);
    console.debug(this.formatLogEntry(logEntry));
  }

  public withContext(context: LogContext): ILogger {
    const mergedContext = { ...this.baseContext, ...context };
    return new ConsoleLogger(mergedContext);
  }

  private createLogEntry(
    level: LogLevel,
    message: string,
    context?: LogContext,
    error?: Error,
  ): LogEntry {
    return {
      level,
      message,
      timestamp: new Date(),
      context: { ...this.baseContext, ...context },
      error,
    };
  }

  private formatLogEntry(entry: LogEntry): string {
    const logObject = {
      level: entry.level,
      message: entry.message,
      timestamp: entry.timestamp.toISOString(),
      ...(entry.context &&
        Object.keys(entry.context).length > 0 && {
          context: entry.context,
        }),
      ...(entry.error && {
        error: {
          name: entry.error.name,
          message: entry.error.message,
          stack: entry.error.stack,
        },
      }),
    };

    return JSON.stringify(logObject, null, 2);
  }
}
