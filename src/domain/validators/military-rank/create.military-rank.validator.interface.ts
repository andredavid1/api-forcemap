import { MilitaryRankProps } from "@domain/entities";

export interface IMilitaryRankPropsValidator {
  validateOrThrow: (props: MilitaryRankProps) => Promise<void>;
}
