/**
 * Route Configurator
 *
 * @description
 * Configurador principal de rotas da aplicação.
 * Agora utiliza o Route Adapter pattern para organização modular.
 *
 * @example
 * ```typescript
 * const httpServer = HttpServerFactory.createFromEnvironment(logger);
 * RouteConfigurator.configure(httpServer);
 * ```
 */

import { IHttpServer } from "@infrastructure/protocols/http";
import { RouteAdapter } from "@infrastructure/router";
import { HealthRouteGroup, MilitaryRankRouteGroup } from "./";

/**
 * Configurador principal de rotas
 */
export class RouteConfigurator {
  /**
   * Configura todas as rotas da aplicação
   */
  public static configure(server: IHttpServer): void {
    const routeAdapter = new RouteAdapter();

    // Registrar grupos de rotas
    const healthRoutes = new HealthRouteGroup();
    const militaryRankRoutes = new MilitaryRankRouteGroup();

    // Health routes (raiz)
    routeAdapter.registerGroup("/", healthRoutes);

    // API v1 routes
    routeAdapter.registerGroup("/api/v1/military-ranks", militaryRankRoutes);

    // Aplicar todas as rotas ao servidor
    routeAdapter.applyRoutes(server);
  }
}
