import { MilitaryRankPropsSanitizer } from "@application/sanitizers";
import { MilitaryRankProps } from "@domain/entities";
import { IMilitaryRankPropsSanitizer } from "@domain/sanitizers";

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

  it("should mantain correct properties", () => {
    const sut = sutInstance.sut;

    const input: MilitaryRankProps = {
      abbreviation: "Sd",
      order: 1,
    } as unknown as MilitaryRankProps;

    const sanitized = sut.sanitize(input);

    expect(sanitized).toEqual({
      abbreviation: "Sd",
      order: 1,
    });
  });

  it("should sanitize military rank properties", () => {
    const sanitizer = sutInstance.sut;

    const input: MilitaryRankProps = {
      abbreviation: "  Gen.  ",
      order: "1st",
    } as unknown as MilitaryRankProps;

    const sanitized = sanitizer.sanitize(input);

    expect(sanitized.abbreviation).toBe("Gen.");
    expect(sanitized.order).toBe(0);
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

  it("should handle non-integer order values", () => {
    const sanitizer = sutInstance.sut;

    const input: MilitaryRankProps = {
      abbreviation: "  Sgt.  ",
      order: 1.5,
    } as unknown as MilitaryRankProps;

    const sanitized = sanitizer.sanitize(input);

    expect(sanitized.abbreviation).toBe("Sgt.");
    expect(sanitized.order).toBe(0);
  });

  it("should handle negative order values", () => {
    const sanitizer = sutInstance.sut;

    const input: MilitaryRankProps = {
      abbreviation: "  Sgt.  ",
      order: -5,
    } as unknown as MilitaryRankProps;

    const sanitized = sanitizer.sanitize(input);

    expect(sanitized.abbreviation).toBe("Sgt.");
    expect(sanitized.order).toBe(0);
  });
});
