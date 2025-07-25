import { MilitaryRank, MilitaryRankProps } from "@domain/entities";
import { IMilitaryRankRepository } from "@domain/repositories";
import { randomUUID } from "node:crypto";

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
        (militaryRank) => militaryRank.abbreviation === abbreviation,
      ) || null,
    );
  };
}
