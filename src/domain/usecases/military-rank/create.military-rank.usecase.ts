import { MilitaryRankProps } from "@domain/entities";

export interface ICreateMilitaryRank {
  create: (props: MilitaryRankProps) => Promise<void>;
}
