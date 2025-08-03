import { ILogger, LogLevel, LogContext, LogEntry } from "@domain/services";

/**
 * Implementação do logger usando console nativo do Node.js
 *
 * @class ConsoleLogger
 * @implements {ILogger}
 * @description
 * Logger para ambiente de desenvolvimento e produção que utiliza console nativo
 * do Node.js. Formata logs em JSON estruturado com timestamp automático,
 * contexto enriquecido e suporte completo a stack traces de erros.
 *
 * @see {@link ILogger} - Interface base para logging
 * @see {@link LoggerFactory} - Factory para criação de loggers
 * @see {@link SilentLogger} - Implementação para testes
 */
export class ConsoleLogger implements ILogger {
  private readonly baseContext: LogContext;

  /**
   * Cria uma nova instância do ConsoleLogger
   *
   * @constructor
   * @param {LogContext} [baseContext={}] - Contexto base aplicado a todos os logs
   * @description
   * Inicializa o logger com um contexto base opcional que será mesclado
   * com o contexto específico de cada log. Útil para definir informações
   * comuns como service, module, layer, etc.
   *
   * @example
   * ```typescript
   * const logger = new ConsoleLogger({
   *   metadata: {
   *     service: "military-rank",
   *     layer: "infrastructure",
   *     version: "1.0.0"
   *   }
   * });
   * ```
   *
   */
  constructor(baseContext: LogContext = {}) {
    this.baseContext = baseContext;
  }

  /**
   * Registra um log de erro (nível ERROR)
   *
   * @method error
   * @param {string} message - Mensagem descritiva do erro
   * @param {Error} [error] - Objeto Error com stack trace (opcional)
   * @param {LogContext} [context] - Contexto adicional para enriquecer o log
   * @returns {void}
   * @description
   * Registra erros críticos que requerem atenção imediata. Inclui
   * stack trace completo quando um objeto Error é fornecido.
   * Usa console.error para output apropriado.
   *
   * @example
   * ```typescript
   * logger.error("Falha na conexão com banco", dbError, {
   *   operation: "database-connect",
   *   metadata: { host: "localhost", port: 5432 }
   * });
   * ```
   *
   * @since 1.0.0
   */
  public error(message: string, error?: Error, context?: LogContext): void {
    const logEntry = this.createLogEntry(
      LogLevel.ERROR,
      message,
      context,
      error,
    );
    console.error(this.formatLogEntry(logEntry));
  }

  /**
   * Registra um log de aviso (nível WARN)
   *
   * @method warn
   * @param {string} message - Mensagem descritiva do aviso
   * @param {LogContext} [context] - Contexto adicional para enriquecer o log
   * @returns {void}
   * @description
   * Registra situações que requerem atenção mas não são críticas.
   * Usa console.warn para output apropriado.
   *
   * @example
   * ```typescript
   * logger.warn("Cache expirou, utilizando dados default", {
   *   operation: "cache-lookup",
   *   metadata: { key: "user-123", ttl: 3600 }
   * });
   * ```
   *
   * @since 1.0.0
   */
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
