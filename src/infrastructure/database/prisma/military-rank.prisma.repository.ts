import {
  MilitaryRank,
  MilitaryRankProps,
} from "@domain/entities/military-rank.entity";
import { IMilitaryRankRepository } from "@domain/repositories";
import { BasePrismaRepository } from "./prisma-repository.base";
import { prismaClient } from "@infrastructure/adapters/prisma-client";
import { PrismaClient } from "@prisma/client";

/**
 * Implementação Prisma do repositório de postos militares
 *
 * @class MilitaryRankPrismaRepository
 * @implements {IMilitaryRankRepository}
 * @extends {BasePrismaRepository}
 * @description
 * Repositório que utiliza Prisma ORM para persistência de dados de postos militares
 * em banco de dados PostgreSQL. Segue os princípios da Clean Architecture,
 * implementando a interface definida na camada de domínio.
 *
 * @see {@link IMilitaryRankRepository} - Interface do repositório
 * @see {@link MilitaryRank} - Entidade de posto militar
 * @see {@link BasePrismaRepository} - Classe base para repositórios Prisma
 */
export class MilitaryRankPrismaRepository
  extends BasePrismaRepository
  implements IMilitaryRankRepository
{
  constructor() {
    super(prismaClient);
  }

  /**
   * Cria um novo posto/graduação militar (implementação da interface do domínio)
   */
  public async create(props: MilitaryRankProps): Promise<void> {
    const client = this.client as PrismaClient;
    await client.militaryRank.create({
      data: {
        abbreviation: props.abbreviation,
        order: props.order,
      },
    });
  }

  /**
   * Busca um posto/graduação militar por abreviatura (implementação da interface do domínio)
   */
  public async findByAbbreviation(
    abbreviation: string,
  ): Promise<MilitaryRank | null> {
    const client = this.client as PrismaClient;
    const militaryRank = await client.militaryRank.findUnique({
      where: { abbreviation },
    });

    if (!militaryRank) return null;

    return {
      id: militaryRank.id,
      abbreviation: militaryRank.abbreviation,
      order: militaryRank.order,
      createdAt: militaryRank.createdAt,
      updatedAt: militaryRank.updatedAt,
    };
  }

  /**
   * Busca um posto/graduação militar por ordem hierárquica (implementação da interface do domínio)
   */
  public async findByOrder(order: number): Promise<MilitaryRank | null> {
    const client = this.client as PrismaClient;
    const militaryRank = await client.militaryRank.findFirst({
      where: { order },
    });

    if (!militaryRank) return null;

    return {
      id: militaryRank.id,
      abbreviation: militaryRank.abbreviation,
      order: militaryRank.order,
      createdAt: militaryRank.createdAt,
      updatedAt: militaryRank.updatedAt,
    };
  }

  // ========================================
  // Métodos auxiliares para operações CRUD
  // ========================================

  /**
   * Busca um posto/graduação militar por ID (método auxiliar)
   */
  public async findById(id: string): Promise<MilitaryRank | null> {
    const client = this.client as PrismaClient;
    const militaryRank = await client.militaryRank.findUnique({
      where: { id },
    });

    if (!militaryRank) return null;

    return {
      id: militaryRank.id,
      abbreviation: militaryRank.abbreviation,
      order: militaryRank.order,
      createdAt: militaryRank.createdAt,
      updatedAt: militaryRank.updatedAt,
    };
  }

  /**
   * Lista todos os postos/graduações militares ordenados por hierarquia (método auxiliar)
   */
  public async findAll(): Promise<MilitaryRank[]> {
    const client = this.client as PrismaClient;
    const militaryRanks = await client.militaryRank.findMany({
      orderBy: { order: "asc" },
    });

    return militaryRanks.map((militaryRank) => ({
      id: militaryRank.id,
      abbreviation: militaryRank.abbreviation,
      order: militaryRank.order,
      createdAt: militaryRank.createdAt,
      updatedAt: militaryRank.updatedAt,
    }));
  }

  /**
   * Atualiza um posto/graduação militar (método auxiliar)
   */
  public async update(
    id: string,
    data: Partial<MilitaryRankProps>,
  ): Promise<MilitaryRank | null> {
    try {
      const client = this.client as PrismaClient;
      const militaryRank = await client.militaryRank.update({
        where: { id },
        data: {
          ...(data.abbreviation && { abbreviation: data.abbreviation }),
          ...(data.order && { order: data.order }),
        },
      });

      return {
        id: militaryRank.id,
        abbreviation: militaryRank.abbreviation,
        order: militaryRank.order,
        createdAt: militaryRank.createdAt,
        updatedAt: militaryRank.updatedAt,
      };
    } catch {
      return null;
    }
  }

  /**
   * Remove um posto/graduação militar (método auxiliar)
   */
  public async delete(id: string): Promise<boolean> {
    try {
      const client = this.client as PrismaClient;
      await client.militaryRank.delete({
        where: { id },
      });
      return true;
    } catch {
      return false;
    }
  }
}
