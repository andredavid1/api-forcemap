import {
  ICreateMilitaryRank,
  IFindMilitaryRankByAbbreviation,
} from "@domain/usecases";

export type IMilitaryRankRepository = ICreateMilitaryRank &
  IFindMilitaryRankByAbbreviation;
