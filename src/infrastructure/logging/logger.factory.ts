import { ILogger } from "@domain/services";
import { ConsoleLogger } from "./console.logger";
import { SilentLogger } from "./silent.logger";

/**
 * Configuração para o logger factory
 */
export interface LoggerConfig {
  type: "console" | "silent";
  level?: "error" | "warn" | "info" | "debug";
}

/**
 * Factory para criar instâncias de logger
 *
 * Permite escolher a implementação baseada no ambiente:
 * - "console" para desenvolvimento e produção
 * - "silent" para testes
 */
export class LoggerFactory {
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
   * Cria logger baseado na variável de ambiente NODE_ENV
   */
  public static createFromEnvironment(): ILogger {
    const isTest = process.env.NODE_ENV === "test";

    if (isTest) {
      return new SilentLogger();
    }

    return new ConsoleLogger();
  }
}
