import { MilitaryRankProps } from "../../../domain/entities";
import { IMilitaryRankRepository } from "../../../domain/repositories";
import { IMilitaryRankPropsSanitizer } from "../../../domain/sanitizers";
import { ICreateMilitaryRank } from "../../../domain/usecases";
import { IMilitaryRankPropsValidator } from "../../../domain/validators";

interface CreateMilitaryRankServiceProps {
  militaryRankRepository: IMilitaryRankRepository;
  militaryRankPropsSanitizer: IMilitaryRankPropsSanitizer;
  militaryRankPropsValidator: IMilitaryRankPropsValidator;
}

export class CreateMilitaryRankService implements ICreateMilitaryRank {
  constructor(private readonly props: CreateMilitaryRankServiceProps) {}

  public readonly create = async (
    militaryRankProps: MilitaryRankProps,
  ): Promise<void> => {
    const {
      militaryRankRepository,
      militaryRankPropsSanitizer,
      militaryRankPropsValidator,
    } = this.props;

    const sanitizedProps =
      militaryRankPropsSanitizer.sanitize(militaryRankProps);
    militaryRankPropsValidator.validateOrThrow(sanitizedProps);
    await militaryRankRepository.create(sanitizedProps);
  };
}
