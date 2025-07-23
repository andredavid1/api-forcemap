import { MilitaryRank } from "@domain/entities";

export interface IFindMilitaryRankByAbbreviation {
  findByAbbreviation: (abbreviation: string) => Promise<MilitaryRank | null>;
}
