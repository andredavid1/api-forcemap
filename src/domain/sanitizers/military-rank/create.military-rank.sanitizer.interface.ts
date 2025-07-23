import { MilitaryRankProps } from "../../entities";

export interface IMilitaryRankPropsSanitizer {
  sanitize: (props: MilitaryRankProps) => MilitaryRankProps;
}
