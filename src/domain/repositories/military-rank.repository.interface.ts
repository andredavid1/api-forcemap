import {
  ICreateMilitaryRank,
  IFindMilitaryRankByAbbreviation,
} from "../usecases";

export type IMilitaryRankRepository = ICreateMilitaryRank &
  IFindMilitaryRankByAbbreviation;
