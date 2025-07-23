import { MilitaryRankPropsSanitizer } from "../../../../application/sanitizers/military-rank/create";
import { MilitaryRankProps } from "../../../../domain/entities";
import { IMilitaryRankPropsSanitizer } from "../../../../domain/sanitizers";

interface SutTypes {
  sut: IMilitaryRankPropsSanitizer;
}

const makeSut = (): SutTypes => {
  const sut = new MilitaryRankPropsSanitizer();
  return { sut };
};

describe("MilitaryRankPropsSanitizer", () => {
  let sutInstance: SutTypes;

  beforeEach(() => {
    sutInstance = makeSut();
  });

  it("should sanitize military rank properties", () => {
    const sanitizer = sutInstance.sut;

    const input: MilitaryRankProps = {
      abbreviation: "  Gen.  ",
      order: "1st",
    } as unknown as MilitaryRankProps;

    const sanitized = sanitizer.sanitize(input);

    expect(sanitized.abbreviation).toBe("Gen.");
    expect(sanitized.order).toBe(1);
  });

  it("should handle empty abbreviation and order", () => {
    const sanitizer = new MilitaryRankPropsSanitizer();
    const input: MilitaryRankProps = {
      abbreviation: "   ",
      order: "",
    } as unknown as MilitaryRankProps;

    const sanitized = sanitizer.sanitize(input);

    expect(sanitized.abbreviation).toBe("");
    expect(sanitized.order).toBe(0);
  });
});
