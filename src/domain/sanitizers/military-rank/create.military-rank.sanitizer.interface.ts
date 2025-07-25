import { MilitaryRankProps } from "@domain/entities";

export interface IMilitaryRankPropsSanitizer {
  sanitize: (props: MilitaryRankProps) => MilitaryRankProps;
}
