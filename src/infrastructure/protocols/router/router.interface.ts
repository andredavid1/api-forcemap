/**
 * Router Protocols - Interfaces para adaptadores de roteamento
 *
 * @description
 * Define contratos para diferentes sistemas de roteamento,
 * permitindo flexibilidade na organização e registro de rotas.
 *
 * @example
 * ```typescript
 * import { IRouteAdapter, IRouteGroup } from "@infrastructure/protocols/router";
 *
 * const router = new FastifyRouteAdapter();
 * const healthRoutes = new HealthRouteGroup();
 * router.registerGroup('/health', healthRoutes);
 * ```
 */

import { IHttpServer, IRouteHandler } from "../http";

/**
 * Interface para adaptadores de roteamento
 */
export interface IRouteAdapter {
  /**
   * Registra um grupo de rotas com um prefixo
   */
  registerGroup(prefix: string, routeGroup: IRouteGroup): void;

  /**
   * Registra uma rota individual
   */
  registerRoute(method: HttpMethod, path: string, handler: IRouteHandler): void;

  /**
   * Aplica as rotas ao servidor HTTP
   */
  applyRoutes(server: IHttpServer): void;
}

/**
 * Interface para grupos de rotas
 */
export interface IRouteGroup {
  /**
   * Define as rotas do grupo
   */
  defineRoutes(adapter: IRouteAdapter): void;

  /**
   * Retorna o prefixo base do grupo (opcional)
   */
  getPrefix?(): string;
}

/**
 * Métodos HTTP suportados
 */
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

/**
 * Definição de uma rota
 */
export interface RouteDefinition {
  method: HttpMethod;
  path: string;
  handler: IRouteHandler;
  middleware?: IRouteHandler[];
}
