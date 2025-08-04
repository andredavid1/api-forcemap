import fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import { ILogger } from "@domain/services";
import {
  IHttpServer,
  IHttpRequest,
  IHttpResponse,
  IRouteHandler,
} from "@infrastructure/protocols/http";

/**
 * Implementação concreta do servidor HTTP usando Fastify
 *
 * @description
 * Implementa a interface IHttpServer usando o framework Fastify.
 * Mantém o desacoplamento através da inversão de dependência,
 * permitindo trocar de framework sem afetar outras camadas.
 */
export class FastifyHttpServer implements IHttpServer {
  private readonly server: FastifyInstance;

  constructor(private readonly logger: ILogger) {
    this.server = fastify({
      logger: false, // Desabilitamos o logger interno do Fastify para usar nosso logger customizado
    });

    this.setupGlobalHooks();
  }

  public async start(port: number, host = "0.0.0.0"): Promise<void> {
    try {
      await this.server.listen({ port, host });

      this.logger.info("HTTP Server started successfully", {
        operation: "server-startup",
        metadata: {
          framework: "fastify",
          port,
          host,
          environment: process.env.NODE_ENV || "development",
        },
      });
    } catch (error) {
      this.logger.error("Failed to start HTTP server", error as Error, {
        operation: "server-startup",
        metadata: {
          framework: "fastify",
          port,
          host,
        },
      });
      throw error;
    }
  }

  public async stop(): Promise<void> {
    try {
      await this.server.close();

      this.logger.info("HTTP Server stopped gracefully", {
        operation: "server-shutdown",
        metadata: {
          framework: "fastify",
        },
      });
    } catch (error) {
      this.logger.error("Error stopping HTTP server", error as Error, {
        operation: "server-shutdown",
        metadata: {
          framework: "fastify",
        },
      });
      throw error;
    }
  }

  public get(path: string, handler: IRouteHandler): void {
    this.server.get(path, this.adaptHandler(handler));
    this.logRouteRegistration("GET", path);
  }

  public post(path: string, handler: IRouteHandler): void {
    this.server.post(path, this.adaptHandler(handler));
    this.logRouteRegistration("POST", path);
  }

  public put(path: string, handler: IRouteHandler): void {
    this.server.put(path, this.adaptHandler(handler));
    this.logRouteRegistration("PUT", path);
  }

  public delete(path: string, handler: IRouteHandler): void {
    this.server.delete(path, this.adaptHandler(handler));
    this.logRouteRegistration("DELETE", path);
  }

  /**
   * Adapta nosso handler customizado para o formato do Fastify
   */
  private adaptHandler(handler: IRouteHandler) {
    return async (request: FastifyRequest, reply: FastifyReply) => {
      const startTime = Date.now();

      try {
        // Converte a requisição do Fastify para nosso formato
        const httpRequest: IHttpRequest = {
          params: request.params as Record<string, unknown>,
          query: request.query as Record<string, unknown>,
          body: request.body,
          headers: request.headers as Record<string, string>,
        };

        // Executa nosso handler (pode ser síncrono ou assíncrono)
        const httpResponse: IHttpResponse = await Promise.resolve(
          handler(httpRequest),
        );

        // Log da requisição bem-sucedida
        this.logger.info("HTTP Request processed", {
          operation: "http-request",
          metadata: {
            method: request.method,
            url: request.url,
            statusCode: httpResponse.statusCode,
            duration: Date.now() - startTime,
          },
        });

        // Define headers se existirem
        if (httpResponse.headers) {
          Object.entries(httpResponse.headers).forEach(([key, value]) => {
            reply.header(key, value);
          });
        }

        // Envia a resposta
        return reply.status(httpResponse.statusCode).send(httpResponse.body);
      } catch (error) {
        this.logger.error("HTTP Request failed", error as Error, {
          operation: "http-request",
          metadata: {
            method: request.method,
            url: request.url,
            duration: Date.now() - startTime,
          },
        });

        // Em caso de erro, retorna 500
        return reply.status(500).send({
          error: "Erro interno do servidor",
        });
      }
    };
  }

  /**
   * Configura hooks globais do Fastify
   */
  private setupGlobalHooks(): void {
    // Hook para log de todas as requisições
    this.server.addHook("onRequest", (request, reply, done) => {
      this.logger.debug("HTTP Request received", {
        operation: "http-request-start",
        metadata: {
          method: request.method,
          url: request.url,
          userAgent: request.headers["user-agent"],
          ip: request.ip,
        },
      });
      // Importante: chamar done() para continuar o processamento
      done();
    });

    // Hook para tratamento de erros não capturados
    this.server.setErrorHandler((error, request, reply) => {
      this.logger.error("Fastify internal error", error, {
        operation: "fastify-error",
        metadata: {
          method: request.method,
          url: request.url,
        },
      });

      reply.status(500).send({
        error: "Erro interno do servidor",
      });
    });
  }

  /**
   * Log do registro de rotas
   */
  private logRouteRegistration(method: string, path: string): void {
    this.logger.debug("Route registered", {
      operation: "route-registration",
      metadata: {
        method,
        path,
        framework: "fastify",
      },
    });
  }
}
