import { MilitaryRankPropsValidator } from "../../../../application/validators/military-rank/create";
import { MilitaryRankProps } from "../../../../domain/entities";
import { IMilitaryRankPropsValidator } from "../../../../domain/validators";

interface SutTypes {
  sut: IMilitaryRankPropsValidator;
}

const makeSut = (): SutTypes => {
  const sut = new MilitaryRankPropsValidator();

  return { sut };
};

describe("MilitaryRankPropsValidator", () => {
  let sutInstance: SutTypes;

  beforeEach(() => {
    sutInstance = makeSut();
  });

  it("should throw if abbreviation is not provided", () => {
    const { sut } = sutInstance;

    const props = { order: 1 } as MilitaryRankProps;

    expect(() => sut.validateOrThrow(props)).toThrow(
      "Campo Abreviatura precisa ser preenchido.",
    );
  });

  it("should throw if abbreviation is undefined", () => {
    const { sut } = sutInstance;

    const props = {
      abbreviation: undefined,
      order: 1,
    } as unknown as MilitaryRankProps;

    expect(() => sut.validateOrThrow(props)).toThrow(
      "Campo Abreviatura precisa ser preenchido.",
    );
  });

  it("should throw if abbreviation is null", () => {
    const { sut } = sutInstance;

    const props = {
      abbreviation: null,
      order: 1,
    } as unknown as MilitaryRankProps;

    expect(() => sut.validateOrThrow(props)).toThrow(
      "Campo Abreviatura precisa ser preenchido.",
    );
  });

  it("should throw if order is not provided", () => {
    const { sut } = sutInstance;

    const props = { abbreviation: "Sd" } as MilitaryRankProps;

    expect(() => sut.validateOrThrow(props)).toThrow(
      "Campo Ordem precisa ser preenchido.",
    );
  });

  it("should throw if order is equal to 0", () => {
    const { sut } = sutInstance;

    const props = { abbreviation: "Sd", order: 0 } as MilitaryRankProps;

    expect(() => sut.validateOrThrow(props)).toThrow(
      "Campo Ordem precisa ser preenchido.",
    );
  });
});
