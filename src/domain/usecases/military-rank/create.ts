import { MilitaryRankProps } from "../../entities";

export interface ICreateMilitaryRank {
  create: (props: MilitaryRankProps) => Promise<void>;
}
