import { MilitaryRankProps } from "../../entities";

export interface IMilitaryRankPropsValidator {
  validateOrThrow: (props: MilitaryRankProps) => void;
}
