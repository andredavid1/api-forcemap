import { MilitaryRankPropsSanitizer } from "@application/sanitizers";
import { MilitaryRankProps } from "@domain/entities";
import { IMilitaryRankPropsSanitizer } from "@application/protocols";

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
    expect(sanitized.order).toBe(undefined); // "1st" não é um número válido
  });

  it("should handle empty abbreviation and order", () => {
    const sanitizer = new MilitaryRankPropsSanitizer();
    const input: MilitaryRankProps = {
      abbreviation: "   ",
      order: "",
    } as unknown as MilitaryRankProps;

    const sanitized = sanitizer.sanitize(input);

    expect(sanitized.abbreviation).toBe("");
    expect(sanitized.order).toBe(undefined); // string vazia retorna undefined
  });

  it("should handle non-integer order values", () => {
    const sanitizer = sutInstance.sut;

    const input: MilitaryRankProps = {
      abbreviation: "  Sgt.  ",
      order: 1.5,
    } as unknown as MilitaryRankProps;

    const sanitized = sanitizer.sanitize(input);

    expect(sanitized.abbreviation).toBe("Sgt.");
    expect(sanitized.order).toBe(1.5); // Sanitização apenas converte, não valida
  });

  it("should handle negative order values", () => {
    const sanitizer = sutInstance.sut;

    const input: MilitaryRankProps = {
      abbreviation: "  Sgt.  ",
      order: -5,
    } as unknown as MilitaryRankProps;

    const sanitized = sanitizer.sanitize(input);

    expect(sanitized.abbreviation).toBe("Sgt.");
    expect(sanitized.order).toBe(-5); // Sanitização apenas converte, não valida
  });

  it("should handle numeric abbreviation values", () => {
    const sanitizer = sutInstance.sut;

    const input: MilitaryRankProps = {
      abbreviation: 123,
      order: 1,
    } as unknown as MilitaryRankProps;

    const sanitized = sanitizer.sanitize(input);

    expect(sanitized.abbreviation).toBe("123"); // Número convertido para string
    expect(sanitized.order).toBe(1);
  });

  it("should handle null abbreviation", () => {
    const sanitizer = sutInstance.sut;

    const input: MilitaryRankProps = {
      abbreviation: null,
      order: 1,
    } as unknown as MilitaryRankProps;

    const sanitized = sanitizer.sanitize(input);

    expect(sanitized.abbreviation).toBe(""); // null retorna string vazia
    expect(sanitized.order).toBe(1);
  });

  it("should handle undefined abbreviation", () => {
    const sanitizer = sutInstance.sut;

    const input: MilitaryRankProps = {
      abbreviation: undefined,
      order: 1,
    } as unknown as MilitaryRankProps;

    const sanitized = sanitizer.sanitize(input);

    expect(sanitized.abbreviation).toBe(""); // undefined retorna string vazia
    expect(sanitized.order).toBe(1);
  });

  it("should handle object/array abbreviation values", () => {
    const sanitizer = sutInstance.sut;

    const input: MilitaryRankProps = {
      abbreviation: { invalid: "object" },
      order: 1,
    } as unknown as MilitaryRankProps;

    const sanitized = sanitizer.sanitize(input);

    expect(sanitized.abbreviation).toBe(""); // Objeto retorna string vazia
    expect(sanitized.order).toBe(1);
  });

  it("should handle array abbreviation values", () => {
    const sanitizer = sutInstance.sut;

    const input: MilitaryRankProps = {
      abbreviation: ["invalid", "array"],
      order: 1,
    } as unknown as MilitaryRankProps;

    const sanitized = sanitizer.sanitize(input);

    expect(sanitized.abbreviation).toBe(""); // Array retorna string vazia
    expect(sanitized.order).toBe(1);
  });

  it("should handle null order", () => {
    const sanitizer = sutInstance.sut;

    const input: MilitaryRankProps = {
      abbreviation: "Sgt",
      order: null,
    } as unknown as MilitaryRankProps;

    const sanitized = sanitizer.sanitize(input);

    expect(sanitized.abbreviation).toBe("Sgt");
    expect(sanitized.order).toBe(undefined); // null retorna undefined
  });
});
