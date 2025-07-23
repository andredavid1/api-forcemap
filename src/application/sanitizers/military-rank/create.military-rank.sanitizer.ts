import { MilitaryRankProps } from "../../../domain/entities";
import { IMilitaryRankPropsSanitizer } from "../../../domain/sanitizers";

export class MilitaryRankPropsSanitizer implements IMilitaryRankPropsSanitizer {
  sanitize(props: MilitaryRankProps): MilitaryRankProps {
    const cleanOrder = Number(
      String(props.order)
        .replace(/[^0-9]/g, "")
        .trim(),
    );

    return {
      ...props,
      abbreviation: String(props.abbreviation).trim(),
      order: Number.isInteger(cleanOrder) ? cleanOrder : 0,
    };
  }
}
