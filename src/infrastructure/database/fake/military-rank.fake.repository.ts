import { MilitaryRank, MilitaryRankProps } from "@domain/entities";
import { IMilitaryRankRepository } from "@domain/repositories";
import { randomUUID } from "node:crypto";

/**
 * Implementação fake do repositório de postos militares para testes e desenvolvimento
 *
 * @class MilitaryRankFakeRepository
 * @implements {IMilitaryRankRepository}
 * @description
 * Repositório em memória que simula operações de persistência de postos militares
 * sem dependência de banco de dados real. Ideal para testes unitários, integração
 * e desenvolvimento local rápido.
 *
 * @see {@link IMilitaryRankRepository} - Interface do repositório
 * @see {@link MilitaryRank} - Entidade de posto militar
 * @see {@link MilitaryRankProps} - Props para criação
 */
export class MilitaryRankFakeRepository implements IMilitaryRankRepository {
  private militaryRanks: MilitaryRank[] = [];

  // eslint-disable-next-line @typescript-eslint/require-await
  public readonly create = async (
    militaryRankProps: MilitaryRankProps,
  ): Promise<void> => {
    this.militaryRanks.push({
      id: randomUUID(),
      ...militaryRankProps,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    });
  };

  public readonly findByAbbreviation = async (
    abbreviation: string,
  ): Promise<MilitaryRank | null> => {
    return Promise.resolve(
      this.militaryRanks.find(
        (militaryRank) =>
          militaryRank.abbreviation.toLowerCase() ===
          abbreviation.toLowerCase(),
      ) || null,
    );
  };

  public readonly findByOrder = async (
    order: number,
  ): Promise<MilitaryRank | null> => {
    return Promise.resolve(
      this.militaryRanks.find((militaryRank) => militaryRank.order === order) ||
        null,
    );
  };
}
