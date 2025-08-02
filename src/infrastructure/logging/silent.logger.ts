import { ILogger, LogContext } from "@domain/services";

/**
 * Estrutura interna de log para o SilentLogger
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
 * Esta implementação:
 * - Não produz nenhuma saída no console
 * - Armazena logs internamente para verificação em testes
 * - Mantém a interface compatível
 * - Permite verificar se logs foram chamados corretamente
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
