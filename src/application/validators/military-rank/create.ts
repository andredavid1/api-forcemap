import { MilitaryRankProps } from "../../../domain/entities";
import { IMilitaryRankPropsValidator } from "../../../domain/validators";

export class MilitaryRankPropsValidator implements IMilitaryRankPropsValidator {
  public readonly validateOrThrow = (props: MilitaryRankProps): void => {
    if (!props.abbreviation) {
      throw new Error("Campo Abreviatura precisa ser preenchido.");
    }

    if (!props.order) {
      throw new Error("Campo Ordem precisa ser preenchido.");
    }
  };
}
