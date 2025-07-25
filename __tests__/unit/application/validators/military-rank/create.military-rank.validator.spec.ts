import { MilitaryRankPropsValidator } from "@application/validators";
import { MilitaryRankProps } from "@domain/entities";
import { IMilitaryRankPropsValidator } from "@domain/validators";

interface SutTypes {
  sut: IMilitaryRankPropsValidator;
  militaryRankRepository: {
    create: jest.Mock;
    findByAbbreviation: jest.Mock;
  };
}

const makeSut = (): SutTypes => {
  const militaryRankRepository = {
    create: jest.fn(),
    findByAbbreviation: jest.fn().mockResolvedValue(null),
  };
  const sut = new MilitaryRankPropsValidator({ militaryRankRepository });

  return { sut, militaryRankRepository };
};

describe("MilitaryRankPropsValidator", () => {
  let sutInstance: SutTypes;

  beforeEach(() => {
    sutInstance = makeSut();
  });

  it("should pass if all required fields are correctly provided", async () => {
    const { sut } = sutInstance;
    const props: MilitaryRankProps = {
      abbreviation: "Sd",
      order: 1,
    };
    await expect(sut.validateOrThrow(props)).resolves.not.toThrow();
  });

  it("should throw if abbreviation is not provided", async () => {
    const { sut } = sutInstance;

    const props = { order: 1 } as MilitaryRankProps;

    await expect(sut.validateOrThrow(props)).rejects.toThrow(
      "O campo Abreviatura precisa ser preenchido.",
    );
  });

  it("should throw if abbreviation is undefined", async () => {
    const { sut } = sutInstance;

    const props = {
      abbreviation: undefined,
      order: 1,
    } as unknown as MilitaryRankProps;

    await expect(sut.validateOrThrow(props)).rejects.toThrow(
      "O campo Abreviatura precisa ser preenchido.",
    );
  });

  it("should throw if abbreviation is null", async () => {
    const { sut } = sutInstance;

    const props = {
      abbreviation: null,
      order: 1,
    } as unknown as MilitaryRankProps;

    await expect(sut.validateOrThrow(props)).rejects.toThrow(
      "O campo Abreviatura precisa ser preenchido.",
    );
  });

  it("should throw if abbreviation already exists", async () => {
    const { sut, militaryRankRepository } = sutInstance;

    const props = { abbreviation: "Sd", order: 1 } as MilitaryRankProps;

    jest
      .spyOn(militaryRankRepository, "findByAbbreviation")
      .mockResolvedValueOnce({
        id: "123",
        ...props,
      } as MilitaryRankProps);

    await expect(sut.validateOrThrow(props)).rejects.toThrow(
      "Já existe um(a) Posto/Graduação com esse valor.",
    );
  });

  it("should throw if order is not provided", async () => {
    const { sut } = sutInstance;

    const props = { abbreviation: "Sd" } as MilitaryRankProps;

    await expect(sut.validateOrThrow(props)).rejects.toThrow(
      "O campo Ordem precisa ser preenchido.",
    );
  });

  it("should throw if order is equal to 0", async () => {
    const { sut } = sutInstance;

    const props = { abbreviation: "Sd", order: 0 } as MilitaryRankProps;

    await expect(sut.validateOrThrow(props)).rejects.toThrow(
      "O campo Ordem precisa ser preenchido.",
    );
  });

  it("should throw if order is undefined", async () => {
    const { sut } = sutInstance;

    const props = {
      abbreviation: "Sd",
      order: undefined,
    } as unknown as MilitaryRankProps;

    await expect(sut.validateOrThrow(props)).rejects.toThrow(
      "O campo Ordem precisa ser preenchido.",
    );
  });

  it("should throw if order is null", async () => {
    const { sut } = sutInstance;

    const props = {
      abbreviation: "Sd",
      order: null,
    } as unknown as MilitaryRankProps;

    await expect(sut.validateOrThrow(props)).rejects.toThrow(
      "O campo Ordem precisa ser preenchido.",
    );
  });
});
