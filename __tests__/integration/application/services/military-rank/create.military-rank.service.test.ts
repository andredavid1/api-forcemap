import { DuplicatedKeyError, MissingParamError } from "@application/errors";
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
  let sut: CreateMilitaryRankService;
  let militaryRankRepository: IMilitaryRankRepository;
  const militaryRankProps: MilitaryRankProps = {
    abbreviation: "Cel",
    order: 1,
  };

  beforeEach(() => {
    sutInstance = makeSut();
    sut = sutInstance.sut;
    militaryRankRepository = sutInstance.militaryRankRepository;
  });

  describe("Successful creation", () => {
    test("should create a military rank with correct props", async () => {
      await expect(sut.create(militaryRankProps)).resolves.not.toThrow();

      const militaryRankCreated =
        await militaryRankRepository.findByAbbreviation(
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

    test("should sanitize abbreviation by trimming whitespace", async () => {
      const propsWithWhitespace: MilitaryRankProps = {
        abbreviation: "  Gen  ",
        order: 2,
      };

      await expect(sut.create(propsWithWhitespace)).resolves.not.toThrow();

      const militaryRankCreated =
        await militaryRankRepository.findByAbbreviation("Gen");

      expect(militaryRankCreated).not.toBeNull();
      expect(militaryRankCreated?.abbreviation).toBe("Gen");
    });

    test("should accept numeric order values", async () => {
      const propsWithNumericOrder: MilitaryRankProps = {
        abbreviation: "Maj",
        order: 3,
      };

      await expect(sut.create(propsWithNumericOrder)).resolves.not.toThrow();

      const militaryRankCreated =
        await militaryRankRepository.findByAbbreviation("Maj");

      expect(militaryRankCreated).not.toBeNull();
      expect(militaryRankCreated?.order).toBe(3);
      expect(typeof militaryRankCreated?.order).toBe("number");
    });
  });

  describe("Validation errors", () => {
    test("should throw MissingParamError when abbreviation is missing", async () => {
      const propsWithoutAbbreviation: MilitaryRankProps = {
        abbreviation: "",
        order: 1,
      };

      await expect(sut.create(propsWithoutAbbreviation)).rejects.toThrow(
        MissingParamError,
      );
      await expect(sut.create(propsWithoutAbbreviation)).rejects.toThrow(
        "O campo Abreviatura precisa ser preenchido.",
      );
    });

    test("should throw DuplicatedKeyError when abbreviation already exists", async () => {
      // Primeiro cria um military rank
      await sut.create(militaryRankProps);

      // Tenta criar outro com a mesma abreviatura
      const duplicatedProps: MilitaryRankProps = {
        abbreviation: militaryRankProps.abbreviation,
        order: 2,
      };

      await expect(sut.create(duplicatedProps)).rejects.toThrow(
        DuplicatedKeyError,
      );
      await expect(sut.create(duplicatedProps)).rejects.toThrow(
        "Já existe um(a) Posto/Graduação com esse valor.",
      );
    });

    test("should throw DuplicatedKeyError even with different case", async () => {
      // Primeiro cria um military rank
      await sut.create(militaryRankProps);

      // Tenta criar outro com a mesma abreviatura em maiúsculas
      const duplicatedProps: MilitaryRankProps = {
        abbreviation: militaryRankProps.abbreviation.toUpperCase(),
        order: 2,
      };

      await expect(sut.create(duplicatedProps)).rejects.toThrow(
        DuplicatedKeyError,
      );
      await expect(sut.create(duplicatedProps)).rejects.toThrow(
        "Já existe um(a) Posto/Graduação com esse valor.",
      );
    });

    test("should throw MissingParamError when order is missing", async () => {
      const propsWithoutOrder = {
        abbreviation: "Ten",
      };

      await expect(
        sut.create(propsWithoutOrder as unknown as MilitaryRankProps),
      ).rejects.toThrow(MissingParamError);
      await expect(
        sut.create(propsWithoutOrder as unknown as MilitaryRankProps),
      ).rejects.toThrow("O campo Ordem precisa ser preenchido.");
    });

    test("should throw MissingParamError when order is null", async () => {
      const propsWithoutOrder = {
        abbreviation: "Ten",
        order: null,
      };

      await expect(
        sut.create(propsWithoutOrder as unknown as MilitaryRankProps),
      ).rejects.toThrow(MissingParamError);
      await expect(
        sut.create(propsWithoutOrder as unknown as MilitaryRankProps),
      ).rejects.toThrow("O campo Ordem precisa ser preenchido.");
    });

    test("should throw MissingParamError when order is zero", async () => {
      const propsWithZeroOrder: MilitaryRankProps = {
        abbreviation: "Sgt",
        order: 0,
      };

      await expect(sut.create(propsWithZeroOrder)).rejects.toThrow(
        MissingParamError,
      );
    });

    test("should throw MissingParamError when order is negative", async () => {
      const propsWithNegativeOrder: MilitaryRankProps = {
        abbreviation: "Cb",
        order: -1,
      };

      await expect(sut.create(propsWithNegativeOrder)).rejects.toThrow(
        MissingParamError,
      );
    });

    test("should throw MissingParamError when order is not a number", async () => {
      const propsWithInvalidOrder = {
        abbreviation: "Cap",
        order: "invalid",
      };

      await expect(
        sut.create(propsWithInvalidOrder as unknown as MilitaryRankProps),
      ).rejects.toThrow(MissingParamError);
      await expect(
        sut.create(propsWithInvalidOrder as unknown as MilitaryRankProps),
      ).rejects.toThrow("O campo Ordem precisa ser preenchido.");
    });

    test("should throw MissingParamError when order is not an integer", async () => {
      const propsWithFloatOrder: MilitaryRankProps = {
        abbreviation: "Sd",
        order: 1.5,
      };

      await expect(sut.create(propsWithFloatOrder)).rejects.toThrow(
        MissingParamError,
      );
    });

    test("should sanitize invalid string order to 0 and throw validation error", async () => {
      const propsWithStringOrder = {
        abbreviation: "Maj",
        order: "3",
      };

      // O sanitizador converte string para 0, que é inválido
      await expect(
        sut.create(propsWithStringOrder as unknown as MilitaryRankProps),
      ).rejects.toThrow(MissingParamError);
      await expect(
        sut.create(propsWithStringOrder as unknown as MilitaryRankProps),
      ).rejects.toThrow("O campo Ordem precisa ser preenchido.");
    });
  });

  describe("Edge cases", () => {
    test("should handle multiple creations in sequence", async () => {
      const ranks: MilitaryRankProps[] = [
        { abbreviation: "Gen Ex", order: 1 },
        { abbreviation: "Gen Div", order: 2 },
        { abbreviation: "Gen Bda", order: 3 },
      ];

      for (const rank of ranks) {
        await expect(sut.create(rank)).resolves.not.toThrow();
      }

      // Verifica se todos foram criados
      for (const rank of ranks) {
        const found = await militaryRankRepository.findByAbbreviation(
          rank.abbreviation,
        );
        expect(found).not.toBeNull();
        expect(found?.order).toBe(rank.order);
      }
    });

    test("should handle special characters in abbreviation", async () => {
      const propsWithSpecialChars: MilitaryRankProps = {
        abbreviation: "1º Ten",
        order: 4,
      };

      await expect(sut.create(propsWithSpecialChars)).resolves.not.toThrow();

      const militaryRankCreated =
        await militaryRankRepository.findByAbbreviation(
          propsWithSpecialChars.abbreviation,
        );

      expect(militaryRankCreated).not.toBeNull();
      expect(militaryRankCreated?.abbreviation).toBe("1º Ten");
    });

    test("should handle very long abbreviation", async () => {
      const propsWithLongAbbreviation: MilitaryRankProps = {
        abbreviation: "A".repeat(100),
        order: 5,
      };

      await expect(
        sut.create(propsWithLongAbbreviation),
      ).resolves.not.toThrow();

      const militaryRankCreated =
        await militaryRankRepository.findByAbbreviation(
          propsWithLongAbbreviation.abbreviation,
        );

      expect(militaryRankCreated).not.toBeNull();
      expect(militaryRankCreated?.abbreviation).toBe("A".repeat(100));
    });
  });
});
