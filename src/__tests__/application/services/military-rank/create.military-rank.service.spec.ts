import { CreateMilitaryRankService } from "../../../../application/services";
import { MilitaryRankProps } from "../../../../domain/entities";

interface SutTypes {
  sut: CreateMilitaryRankService;
}

const makeSut = (): SutTypes => {
  const militaryRankRepository = {
    create: jest.fn(),
  };
  const militaryRankPropsSanitizer = {
    sanitize: jest.fn(),
  };
  const militaryRankPropsValidator = {
    validateOrThrow: jest.fn(),
  };

  const sut = new CreateMilitaryRankService({
    militaryRankRepository,
    militaryRankPropsSanitizer,
    militaryRankPropsValidator,
  });

  return { sut };
};

describe("CreateMilitaryRankService", () => {
  let sutInstance: SutTypes;

  beforeEach(() => {
    sutInstance = makeSut();
  });

  it("should be able to create a military rank", async () => {
    const { sut } = sutInstance;
    const militaryRankProps: MilitaryRankProps = {
      abbreviation: "Sd",
      order: 13,
    };

    await expect(sut.create(militaryRankProps)).resolves.not.toThrow();
  });
});
