import { MilitaryRankProps } from "../../entities";

export interface IMilitaryRankCreate {
  create: (props: MilitaryRankProps) => Promise<void>;
}
