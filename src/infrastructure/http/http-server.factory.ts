import { ILogger } from "@domain/services";
import { FastifyHttpServer } from "./fastify-http-server";
import { IHttpServer } from "@infrastructure/protocols/http";

/**
 * Factory para criação de servidores HTTP
 *
 * @description
 * Implementa o padrão Factory para criação de diferentes implementações
 * de servidores HTTP. Permite trocar de implementação facilmente
 * através de configuração.
 */
export class HttpServerFactory {
  /**
   * Cria uma instância de servidor HTTP baseada no ambiente
   *
   * @param logger - Logger para ser injetado no servidor
   * @param serverType - Tipo de servidor (padrão: 'fastify')
   * @returns Instância do servidor HTTP
   */
  public static create(logger: ILogger, serverType = "fastify"): IHttpServer {
    switch (serverType) {
      case "fastify":
        return new FastifyHttpServer(logger);

      default:
        throw new Error(`Unsupported server type: ${String(serverType)}`);
    }
  }

  /**
   * Cria uma instância de servidor HTTP a partir de variáveis de ambiente
   *
   * @param logger - Logger para ser injetado no servidor
   * @returns Instância do servidor HTTP
   */
  public static createFromEnvironment(logger: ILogger): IHttpServer {
    const serverType = (process.env.HTTP_SERVER_TYPE as "fastify") || "fastify";
    return this.create(logger, serverType);
  }
}
