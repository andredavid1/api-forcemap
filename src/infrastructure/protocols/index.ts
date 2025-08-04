/**
 * Protocols - Interfaces para Adaptadores
 *
 * @description
 * Centraliza todas as interfaces de adaptadores da aplicação,
 * organizadas por domínio tecnológico. Facilita a descoberta,
 * manutenção e evolução dos contratos.
 *
 * @architecture
 * - protocols/http/       → Adaptadores HTTP (Fastify, Express, etc.)
 * - protocols/router/     → Adaptadores de roteamento (RouteGroup, RouteAdapter)
 * - protocols/database/   → Adaptadores de banco (MongoDB, PostgreSQL, etc.)
 * - protocols/cache/      → Adaptadores de cache (Redis, Memcached, etc.)
 * - protocols/messaging/  → Adaptadores de mensageria (RabbitMQ, Kafka, etc.)
 * - protocols/storage/    → Adaptadores de storage (S3, FileSystem, etc.)
 *
 * @example
 * ```typescript
 * // Importação centralizada por domínio
 * import { IHttpServer } from "@infrastructure/protocols/http";
 * import { IRouteAdapter } from "@infrastructure/protocols/router";
 * import { IDatabaseConnection } from "@infrastructure/protocols/database";
 * import { ICacheProvider } from "@infrastructure/protocols/cache";
 * ```
 */

// HTTP Adapters
export * from "./http";

// Router Adapters
export * from "./router";

// Database Adapters
export * from "./database";

// Cache Adapters
export * from "./cache";
