/**
 * Routes - Barrel Exports
 *
 * @description
 * Centraliza todas as rotas da aplicação organizadas por funcionalidade.
 * Facilita a importação e descoberta de rotas, handlers e route groups.
 *
 * @example
 * ```typescript
 * // Importar route groups específicos
 * import { HealthRouteGroup, MilitaryRankRouteGroup } from "@presentation/routes";
 *
 * // Importar handlers específicos
 * import { healthCheckHandler, createMilitaryRankHandler } from "@presentation/routes";
 * ```
 */

// Health Routes
export * from "./health";

// Military Rank Routes
export * from "./military-rank";

// Route Configurator (backward compatibility)
export * from "./route-configurator";
