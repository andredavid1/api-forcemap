/**
 * Route Adapter Implementation
 *
 * @description
 * Implementação do adaptador de rotas que permite registro organizado
 * de grupos de rotas e aplicação das mesmas ao servidor HTTP.
 *
 * @example
 * ```typescript
 * const routeAdapter = new RouteAdapter();
 * const healthRoutes = new HealthRouteGroup();
 *
 * routeAdapter.registerGroup("/api/v1", healthRoutes);
 * routeAdapter.applyRoutes(httpServer);
 * ```
 */

import {
  IRouteAdapter,
  IRouteGroup,
  HttpMethod,
  RouteDefinition,
} from "@infrastructure/protocols/router";
import { IHttpServer, IRouteHandler } from "@infrastructure/protocols/http";

/**
 * Implementação do adaptador de rotas
 */
export class RouteAdapter implements IRouteAdapter {
  private readonly routes: RouteDefinition[] = [];

  /**
   * Registra um grupo de rotas com um prefixo
   */
  public registerGroup(prefix: string, routeGroup: IRouteGroup): void {
    // Criar um adapter temporário para capturar as rotas
    const groupAdapter = new GroupRouteAdapter(prefix);
    routeGroup.defineRoutes(groupAdapter);

    // Adicionar as rotas capturadas à lista principal
    this.routes.push(...groupAdapter.getRoutes());
  }

  /**
   * Registra uma rota individual
   */
  public registerRoute(
    method: HttpMethod,
    path: string,
    handler: IRouteHandler,
  ): void {
    this.routes.push({
      method,
      path,
      handler,
    });
  }

  /**
   * Aplica as rotas ao servidor HTTP
   */
  public applyRoutes(server: IHttpServer): void {
    for (const route of this.routes) {
      switch (route.method) {
        case "GET":
          server.get(route.path, route.handler);
          break;
        case "POST":
          server.post(route.path, route.handler);
          break;
        case "PUT":
          server.put(route.path, route.handler);
          break;
        case "DELETE":
          server.delete(route.path, route.handler);
          break;
        default:
          throw new Error(`Unsupported HTTP method: ${route.method}`);
      }
    }
  }

  /**
   * Retorna todas as rotas registradas (para debugging)
   */
  public getRoutes(): RouteDefinition[] {
    return [...this.routes];
  }
}

/**
 * Adaptador interno para capturar rotas de um grupo
 */
class GroupRouteAdapter implements IRouteAdapter {
  private readonly routes: RouteDefinition[] = [];

  constructor(private readonly prefix: string) {}

  public registerGroup(prefix: string, routeGroup: IRouteGroup): void {
    // Grupos aninhados: combinar prefixos
    const combinedPrefix = this.combinePaths(this.prefix, prefix);
    const nestedAdapter = new GroupRouteAdapter(combinedPrefix);
    routeGroup.defineRoutes(nestedAdapter);
    this.routes.push(...nestedAdapter.getRoutes());
  }

  public registerRoute(
    method: HttpMethod,
    path: string,
    handler: IRouteHandler,
  ): void {
    const fullPath = this.combinePaths(this.prefix, path);
    this.routes.push({
      method,
      path: fullPath,
      handler,
    });
  }

  public applyRoutes(): void {
    // Não aplicado aqui, apenas captura
  }

  public getRoutes(): RouteDefinition[] {
    return [...this.routes];
  }

  private combinePaths(prefix: string, path: string): string {
    const cleanPrefix = prefix.replace(/\/$/, "");
    const cleanPath = path.startsWith("/") ? path : `/${path}`;

    // Se o path é apenas "/" e temos um prefix, usar apenas o prefix
    if (cleanPath === "/" && cleanPrefix) {
      return cleanPrefix;
    }

    // Se não há prefix, usar apenas o path
    if (!cleanPrefix) {
      return cleanPath;
    }

    return `${cleanPrefix}${cleanPath}`;
  }
}
