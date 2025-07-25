import { MilitaryRankPropsSanitizer } from "@application/sanitizers";
import { CreateMilitaryRankService } from "@application/services";
import { MilitaryRankPropsValidator } from "@application/validators";
import { MilitaryRankProps } from "@domain/entities";
import { IMilitaryRankRepository } from "@domain/repositories";
import { MilitaryRankFakeRepository } from "@infrastructure/database";

interface SutTypes {
  sut: CreateMilitaryRankService;
  militaryRankRepository: IMilitaryRankRepository;
}

const makeSut = (): SutTypes => {
  const militaryRankPropsSanitizer = new MilitaryRankPropsSanitizer();
  const militaryRankRepository = new MilitaryRankFakeRepository();
  const militaryRankPropsValidator = new MilitaryRankPropsValidator({
    militaryRankRepository,
  });
  const sut = new CreateMilitaryRankService({
    militaryRankPropsSanitizer,
    militaryRankPropsValidator,
    militaryRankRepository,
  });

  return { sut, militaryRankRepository };
};

describe("CreateMilitaryRankService Integration Test", () => {
  let sutInstance: SutTypes;

  beforeEach(() => {
    sutInstance = makeSut();
  });

  test("should create a military rank with correct props", async () => {
    const { sut, militaryRankRepository } = sutInstance;

    const militaryRankProps: MilitaryRankProps = {
      abbreviation: "Cel",
      order: 1,
    };

    await expect(sut.create(militaryRankProps)).resolves.not.toThrow();

    const militaryRankCreated = await militaryRankRepository.findByAbbreviation(
      militaryRankProps.abbreviation,
    );

    expect(militaryRankCreated).not.toBeNull();
    expect(militaryRankCreated?.abbreviation).toBe(
      militaryRankProps.abbreviation,
    );
    expect(militaryRankCreated?.order).toBe(militaryRankProps.order);
    expect(militaryRankCreated).toHaveProperty("id");
    expect(militaryRankCreated).toHaveProperty("createdAt");
    expect(militaryRankCreated).toHaveProperty("updatedAt");
  });
});
