/**
 * Database Protocols - Interfaces para adaptadores de banco de dados
 *
 * @description
 * Define contratos para diferentes sistemas de banco de dados,
 * permitindo trocar implementações sem afetar a lógica de negócio.
 *
 * @example
 * ```typescript
 * import { IDatabaseConnection, IQueryBuilder } from "@protocols/database";
 *
 * // Suporte a múltiplos bancos:
 * const mongodb = new MongoDBAdapter();
 * const postgres = new PostgreSQLAdapter();
 * const mysql = new MySQLAdapter();
 * ```
 */

/**
 * Interface para conexões de banco de dados
 */
export interface IDatabaseConnection {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  isConnected(): boolean;
  getHealth(): Promise<{ status: "healthy" | "unhealthy"; latency?: number }>;
}

/**
 * Interface para repositórios genéricos
 */
export interface IRepository<
  T,
  CreateDto = Partial<T>,
  UpdateDto = Partial<T>,
> {
  create(data: CreateDto): Promise<T>;
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  update(id: string, data: UpdateDto): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}

/**
 * Interface para query builders
 */
export interface IQueryBuilder<T> {
  where(field: keyof T, operator: string, value: unknown): IQueryBuilder<T>;
  orderBy(field: keyof T, direction: "asc" | "desc"): IQueryBuilder<T>;
  limit(count: number): IQueryBuilder<T>;
  offset(count: number): IQueryBuilder<T>;
  execute(): Promise<T[]>;
}
