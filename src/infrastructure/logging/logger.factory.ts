import { ILogger } from "@domain/services";
import { ConsoleLogger } from "./console.logger";
import { SilentLogger } from "./silent.logger";

/**
 * Configuração para o logger factory
 *
 * @interface LoggerConfig
 * @description
 * Define as opções de configuração disponíveis para criação de loggers
 * através do factory pattern.
 */
export interface LoggerConfig {
  /** Tipo de logger a ser criado */
  type: "console" | "silent";
  /** Nível mínimo de log (futuro uso) */
  level?: "error" | "warn" | "info" | "debug";
}

/**
 * Factory para criar instâncias de logger baseado em configuração
 *
 * @class LoggerFactory
 * @description
 * Implementa o padrão Factory para criação de loggers, permitindo escolher
 * a implementação apropriada baseada no ambiente de execução ou configuração
 * específica. Facilita a troca de implementações sem alterar código cliente.
 *
 * Esta factory suporta:
 * - Criação baseada em configuração explícita
 * - Criação automática baseada em variável de ambiente
 * - Extensibilidade para novas implementações de logger
 * - Type safety completo com TypeScript
 *
 * @see {@link ILogger} - Interface base para logging
 * @see {@link ConsoleLogger} - Implementação para console
 * @see {@link SilentLogger} - Implementação para testes
 */
export class LoggerFactory {
  /**
   * Cria uma instância de logger baseada na configuração fornecida
   *
   * @static
   * @method create
   * @param {LoggerConfig} config - Configuração do logger a ser criado
   * @returns {ILogger} Instância do logger configurado
   * @description
   * Factory method principal que cria loggers baseado na configuração.
   * Suporta diferentes tipos de implementação com fallback seguro
   * para ConsoleLogger em caso de tipo não reconhecido.
   *
   * @example
   * ```typescript
   * // Logger para produção
   * const prodLogger = LoggerFactory.create({ type: "console" });
   *
   * // Logger para testes
   * const testLogger = LoggerFactory.create({ type: "silent" });
   * ```
   *
   * @since 1.0.0
   */
  public static create(config: LoggerConfig): ILogger {
    switch (config.type) {
      case "console":
        return new ConsoleLogger();
      case "silent":
        return new SilentLogger();
      default:
        return new ConsoleLogger();
    }
  }

  /**
   * Cria logger automaticamente baseado na variável de ambiente NODE_ENV
   *
   * @static
   * @method createFromEnvironment
   * @returns {ILogger} Instância do logger apropriado para o ambiente
   * @description
   * Convenience method que escolhe automaticamente a implementação
   * de logger mais apropriada baseada no ambiente de execução:
   * - NODE_ENV=test -> SilentLogger (sem output no console)
   * - Outros valores -> ConsoleLogger (output estruturado)
   *
   * @example
   * ```typescript
   * // Criação automática baseada em ambiente
   * const logger = LoggerFactory.createFromEnvironment();
   *
   * // Em testes: retorna SilentLogger
   * // Em desenvolvimento/produção: retorna ConsoleLogger
   * ```
   *
   * @since 1.0.0
   */
  public static createFromEnvironment(): ILogger {
    const isTest = process.env.NODE_ENV === "test";

    if (isTest) {
      return new SilentLogger();
    }

    return new ConsoleLogger();
  }
}
