import { MilitaryRankProps } from "../../../domain/entities";
import { IMilitaryRankPropsSanitizer } from "../../../domain/sanitizers";

export class MilitaryRankPropsSanitizer implements IMilitaryRankPropsSanitizer {
  sanitize(props: MilitaryRankProps): MilitaryRankProps {
    return {
      ...props,
      abbreviation: props.abbreviation.trim(),
      order: Number(
        String(props.order)
          .replace(/[^0-9]/g, "")
          .trim(),
      ),
    };
  }
}
