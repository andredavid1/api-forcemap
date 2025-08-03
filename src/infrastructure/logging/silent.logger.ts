import { ILogger, LogContext } from "@domain/services";

/**
 * Estrutura interna de log para o SilentLogger
 *
 * @interface StoredLog
 * @description
 * Representa um log armazenado internamente pelo SilentLogger
 * para verificação durante testes unitários.
 */
interface StoredLog {
  level: string;
  message: string;
  context?: LogContext;
  error?: Error;
  timestamp: Date;
}

/**
 * Implementação de logger silencioso para testes
 *
 * @class SilentLogger
 * @implements {ILogger}
 * @description
 * Logger especialmente projetado para ambiente de testes que não produz
 * nenhuma saída no console, mas armazena todos os logs internamente para
 * verificação posterior. Essencial para manter testes limpos e verificar
 * se o logging está funcionando corretamente.
 *
 * Esta implementação é otimizada para:
 * - Testes unitários sem poluição de console
 * - Verificação de chamadas de logging em testes
 * - Validação de contexto e metadados nos logs
 * - Performance em suites de teste extensas
 *
 * @example
 * ```typescript
 * // Uso básico em testes
 * const logger = new SilentLogger();
 * logger.info("Test message");
 *
 * // Verificação em testes
 * const logs = logger.getLogs();
 * expect(logs).toHaveLength(1);
 * expect(logs[0].message).toBe("Test message");
 * ```
 *
 * @example
 * ```typescript
 * // Verificação de contexto específico
 * const logger = new SilentLogger();
 * logger.error("Error occurred", new Error("Test"), {
 *   operation: "test-operation"
 * });
 *
 * const errorLogs = logger.getLogsByLevel("error");
 * expect(errorLogs[0].context?.operation).toBe("test-operation");
 * ```
 *
 * @since 1.0.0
 * @author API Force Map Team
 * @see {@link ILogger} - Interface base para logging
 * @see {@link ConsoleLogger} - Implementação para desenvolvimento/produção
 * @see {@link LoggerFactory} - Factory para criação de loggers
 */
export class SilentLogger implements ILogger {
  private readonly logs: StoredLog[] = [];
  private readonly baseContext: LogContext;

  constructor(baseContext: LogContext = {}) {
    this.baseContext = baseContext;
  }

  public error(message: string, error?: Error, context?: LogContext): void {
    this.logs.push({
      level: "error",
      message,
      context: { ...this.baseContext, ...context },
      error,
      timestamp: new Date(),
    });
  }

  public warn(message: string, context?: LogContext): void {
    this.logs.push({
      level: "warn",
      message,
      context: { ...this.baseContext, ...context },
      timestamp: new Date(),
    });
  }

  public info(message: string, context?: LogContext): void {
    this.logs.push({
      level: "info",
      message,
      context: { ...this.baseContext, ...context },
      timestamp: new Date(),
    });
  }

  public debug(message: string, context?: LogContext): void {
    this.logs.push({
      level: "debug",
      message,
      context: { ...this.baseContext, ...context },
      timestamp: new Date(),
    });
  }

  public withContext(context: LogContext): ILogger {
    const mergedContext = { ...this.baseContext, ...context };
    return new SilentLogger(mergedContext);
  }

  /**
   * Métodos utilitários para testes
   */
  public getLogs(): StoredLog[] {
    return [...this.logs];
  }

  public getLastLog(): StoredLog | undefined {
    return this.logs[this.logs.length - 1];
  }

  public clearLogs(): void {
    this.logs.length = 0;
  }

  public getLogsByLevel(level: string): StoredLog[] {
    return this.logs.filter((log) => log.level === level);
  }
}
