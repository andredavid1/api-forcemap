/**
 * Military Rank Route Group
 *
 * @description
 * Grupo de rotas para operações CRUD de Military Rank.
 * Implementa o padrão Route Group para organização modular.
 *
 * @example
 * ```typescript
 * const routeAdapter = new RouteAdapter();
 * const militaryRankRoutes = new MilitaryRankRouteGroup();
 *
 * routeAdapter.registerGroup("/api/v1/military-ranks", militaryRankRoutes);
 * routeAdapter.applyRoutes(httpServer);
 * ```
 */

import { IRouteGroup, IRouteAdapter } from "@infrastructure/protocols/router";
import {
  createMilitaryRankHandler,
  listMilitaryRanksHandler,
  getMilitaryRankByIdHandler,
  updateMilitaryRankHandler,
  deleteMilitaryRankHandler,
} from "./military-rank.handlers";

/**
 * Grupo de rotas para operações CRUD de Military Rank
 */
export class MilitaryRankRouteGroup implements IRouteGroup {
  /**
   * Define as rotas do grupo
   */
  public defineRoutes(adapter: IRouteAdapter): void {
    // POST /military-ranks - Criar nova patente militar
    adapter.registerRoute("POST", "/", createMilitaryRankHandler);

    // GET /military-ranks - Listar todas as patentes militares
    adapter.registerRoute("GET", "/", listMilitaryRanksHandler);

    // GET /military-ranks/:id - Buscar patente militar por ID
    adapter.registerRoute("GET", "/:id", getMilitaryRankByIdHandler);

    // PUT /military-ranks/:id - Atualizar patente militar
    adapter.registerRoute("PUT", "/:id", updateMilitaryRankHandler);

    // DELETE /military-ranks/:id - Deletar patente militar
    adapter.registerRoute("DELETE", "/:id", deleteMilitaryRankHandler);
  }

  /**
   * Retorna o prefixo base do grupo
   */
  public getPrefix(): string {
    return "/military-ranks";
  }
}
