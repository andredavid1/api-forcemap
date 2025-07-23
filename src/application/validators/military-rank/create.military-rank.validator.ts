import { MilitaryRankProps } from "@domain/entities";
import { MissingParamError } from "@domain/errors";
import { IMilitaryRankPropsValidator } from "@domain/validators";

export class MilitaryRankPropsValidator implements IMilitaryRankPropsValidator {
  private props: MilitaryRankProps = {} as MilitaryRankProps;

  private readonly setMilitaryRankProps = (props: MilitaryRankProps): void => {
    this.props = props;
  };

  private readonly missingFieldsValidator = (): void => {
    interface RequiredFields {
      field: keyof MilitaryRankProps;
      label: string;
    }

    const requiredFields: RequiredFields[] = [
      { field: "abbreviation", label: "Abreviatura" },
      { field: "order", label: "Ordem" },
    ];

    for (const fieldValidator of requiredFields) {
      if (!this.props[fieldValidator.field]) {
        throw new MissingParamError(fieldValidator.label);
      }
    }
  };

  public readonly validateOrThrow = (props: MilitaryRankProps): void => {
    this.setMilitaryRankProps(props);
    this.missingFieldsValidator();
  };
}
