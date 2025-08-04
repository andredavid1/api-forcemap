/**
 * Cache Protocols - Interfaces para adaptadores de cache
 *
 * @description
 * Define contratos para diferentes sistemas de cache,
 * permitindo flexibilidade na escolha da implementação.
 *
 * @example
 * ```typescript
 * import { ICacheProvider } from "@protocols/cache";
 *
 * // Suporte a múltiplos providers:
 * const redis = new RedisAdapter();
 * const memcached = new MemcachedAdapter();
 * const memory = new InMemoryAdapter();
 * ```
 */

/**
 * Interface para providers de cache
 */
export interface ICacheProvider {
  /**
   * Obtém um valor do cache
   */
  get<T>(key: string): Promise<T | null>;

  /**
   * Define um valor no cache
   */
  set<T>(key: string, value: T, ttlSeconds?: number): Promise<void>;

  /**
   * Remove um valor do cache
   */
  delete(key: string): Promise<boolean>;

  /**
   * Limpa todo o cache
   */
  clear(): Promise<void>;

  /**
   * Verifica se uma chave existe
   */
  exists(key: string): Promise<boolean>;

  /**
   * Obtém informações de saúde do cache
   */
  getHealth(): Promise<{ status: "healthy" | "unhealthy"; latency?: number }>;
}
