import { PrismaClient } from "@prisma/client";

type PrismaTransactionClient = Omit<
  PrismaClient,
  "$extends" | "$transaction" | "$disconnect" | "$connect" | "$on"
>;

/**
 * Interface base para repositórios que utilizam Prisma
 * Segue os princípios da arquitetura limpa
 */
export interface PrismaRepository {
  readonly client: PrismaClient | ReturnType<PrismaClient["$extends"]>;
}

/**
 * Classe base para repositórios Prisma
 * Fornece funcionalidades comuns para todos os repositórios
 */
export abstract class BasePrismaRepository implements PrismaRepository {
  constructor(
    public readonly client: PrismaClient | ReturnType<PrismaClient["$extends"]>,
  ) {}

  /**
   * Executa uma transação com o Prisma
   */
  protected async executeTransaction<T>(
    operations: (tx: PrismaTransactionClient) => Promise<T>,
  ): Promise<T> {
    return await (this.client as PrismaClient).$transaction(operations);
  }
}
