import { DuplicatedKeyError, MissingParamError } from "@application/errors";
import { MilitaryRankProps } from "@domain/entities";
import { IMilitaryRankRepository } from "@domain/repositories";
import { IMilitaryRankPropsValidator } from "@domain/validators";

interface ConstructorProps {
  militaryRankRepository: IMilitaryRankRepository;
}
export class MilitaryRankPropsValidator implements IMilitaryRankPropsValidator {
  private props: MilitaryRankProps = {} as MilitaryRankProps;

  constructor(private readonly constructorProps: ConstructorProps) {}

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

  private readonly abbreviationExistsValidator = async (): Promise<void> => {
    const { militaryRankRepository } = this.constructorProps;

    const militaryRank = await militaryRankRepository.findByAbbreviation(
      this.props.abbreviation,
    );
    if (militaryRank) {
      throw new DuplicatedKeyError("Posto/Graduação");
    }
  };

  public readonly validateOrThrow = async (
    props: MilitaryRankProps,
  ): Promise<void> => {
    this.setMilitaryRankProps(props);
    this.missingFieldsValidator();
    await this.abbreviationExistsValidator();
  };
}
