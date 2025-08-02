/**
 * Níveis de log disponíveis no sistema
 */
export enum LogLevel {
  ERROR = "error",
  WARN = "warn",
  INFO = "info",
  DEBUG = "debug",
}

/**
 * Contexto adicional para enriquecer logs
 */
export interface LogContext {
  userId?: string;
  requestId?: string;
  operation?: string;
  entity?: string;
  entityId?: string;
  duration?: number;
  metadata?: Record<string, unknown>;
}

/**
 * Estrutura padronizada de log
 */
export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  context?: LogContext;
  error?: Error;
}

/**
 * Interface principal para logging no sistema
 */
export interface ILogger {
  /**
   * Log de erro - para erros críticos e exceções
   */
  error(message: string, error?: Error, context?: LogContext): void;

  /**
   * Log de aviso - para situações que requerem atenção
   */
  warn(message: string, context?: LogContext): void;

  /**
   * Log de informação - para eventos importantes do sistema
   */
  info(message: string, context?: LogContext): void;

  /**
   * Log de debug - para informações detalhadas de desenvolvimento
   */
  debug(message: string, context?: LogContext): void;

  /**
   * Cria um logger com contexto específico
   */
  withContext(context: LogContext): ILogger;
}
