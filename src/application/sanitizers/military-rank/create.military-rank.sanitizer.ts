import { MilitaryRankProps } from "../../../domain/entities";
import { IMilitaryRankPropsSanitizer } from "../../../domain/sanitizers";

export class MilitaryRankPropsSanitizer implements IMilitaryRankPropsSanitizer {
  sanitize(props: MilitaryRankProps): MilitaryRankProps {
    const cleanOrder = (value: unknown): number => {
      const num = Number(value);

      if (
        typeof value !== "number" ||
        Number.isNaN(num) ||
        !Number.isInteger(num) ||
        num <= 0
      ) {
        return 0;
      }

      return num;
    };

    return {
      ...props,
      abbreviation: String(props.abbreviation).trim(),
      order: cleanOrder(props.order),
    };
  }
}
