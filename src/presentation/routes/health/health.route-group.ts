/**
 * Health Route Group
 *
 * @description
 * Grupo de rotas relacionadas à saúde e informações da API.
 * Implementa o padrão Route Group para organização modular.
 *
 * @example
 * ```typescript
 * const routeAdapter = new RouteAdapter();
 * const healthRoutes = new HealthRouteGroup();
 *
 * routeAdapter.registerGroup("/", healthRoutes);
 * routeAdapter.applyRoutes(httpServer);
 * ```
 */

import { IRouteGroup, IRouteAdapter } from "@infrastructure/protocols/router";
import { healthCheckHandler, apiInfoHandler } from "./health.handlers";

/**
 * Grupo de rotas para health check e informações da API
 */
export class HealthRouteGroup implements IRouteGroup {
  /**
   * Define as rotas do grupo
   */
  public defineRoutes(adapter: IRouteAdapter): void {
    // Health check endpoint
    adapter.registerRoute("GET", "/health", healthCheckHandler);

    // API info endpoint
    adapter.registerRoute("GET", "/", apiInfoHandler);
  }

  /**
   * Retorna o prefixo base do grupo
   */
  public getPrefix(): string {
    return "/";
  }
}
