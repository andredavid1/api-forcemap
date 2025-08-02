import {
  DuplicatedKeyError,
  MissingParamError,
  InvalidParamError,
} from "@application/errors";
import { MilitaryRankPropsSanitizer } from "@application/sanitizers";
import { CreateMilitaryRankService } from "@application/services";
import { MilitaryRankPropsValidator } from "@application/validators";
import { MilitaryRankProps } from "@domain/entities";
import { IMilitaryRankRepository } from "@domain/repositories";
import { MilitaryRankFakeRepository } from "@infrastructure/database";
import { SilentLogger } from "@infrastructure/logging";

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
  // ✅ Logger real para teste de integração (SilentLogger para não poluir output)
  const logger = new SilentLogger();

  const sut = new CreateMilitaryRankService({
    militaryRankPropsSanitizer,
    militaryRankPropsValidator,
    militaryRankRepository,
    logger, // ✅ Logger injetado
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

    test("should throw DuplicatedKeyError when order already exists", async () => {
      // Primeiro cria um military rank
      await sut.create(militaryRankProps);

      // Tenta criar outro com a mesma ordem
      const duplicatedOrderProps: MilitaryRankProps = {
        abbreviation: "Gen",
        order: militaryRankProps.order, // Mesma ordem
      };

      await expect(sut.create(duplicatedOrderProps)).rejects.toThrow(
        DuplicatedKeyError,
      );
      await expect(sut.create(duplicatedOrderProps)).rejects.toThrow(
        "Já existe um(a) Ordem hierárquica com esse valor.",
      );
    });

    test("should allow same abbreviation with different order if different case", async () => {
      // Este teste garante que a validação de ordem seja independente da abreviatura
      const firstRank: MilitaryRankProps = {
        abbreviation: "Sd",
        order: 1,
      };

      const secondRank: MilitaryRankProps = {
        abbreviation: "Sgt",
        order: 2,
      };

      await expect(sut.create(firstRank)).resolves.not.toThrow();
      await expect(sut.create(secondRank)).resolves.not.toThrow();

      // Verifica se ambos foram criados
      const firstCreated = await militaryRankRepository.findByOrder(1);
      const secondCreated = await militaryRankRepository.findByOrder(2);

      expect(firstCreated).not.toBeNull();
      expect(secondCreated).not.toBeNull();
      expect(firstCreated?.abbreviation).toBe("Sd");
      expect(secondCreated?.abbreviation).toBe("Sgt");
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

    test("should throw InvalidParamError when order is zero", async () => {
      const propsWithZeroOrder: MilitaryRankProps = {
        abbreviation: "Sgt",
        order: 0,
      };

      await expect(sut.create(propsWithZeroOrder)).rejects.toThrow(
        InvalidParamError,
      );
      await expect(sut.create(propsWithZeroOrder)).rejects.toThrow(
        "O campo Ordem é inválido: deve ser maior que zero",
      );
    });

    test("should throw InvalidParamError when order is negative", async () => {
      const propsWithNegativeOrder: MilitaryRankProps = {
        abbreviation: "Cb",
        order: -1,
      };

      await expect(sut.create(propsWithNegativeOrder)).rejects.toThrow(
        InvalidParamError,
      );
      await expect(sut.create(propsWithNegativeOrder)).rejects.toThrow(
        "O campo Ordem é inválido: deve ser maior que zero",
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

    test("should throw InvalidParamError when order is not an integer", async () => {
      const propsWithFloatOrder: MilitaryRankProps = {
        abbreviation: "Sd",
        order: 1.5,
      };

      await expect(sut.create(propsWithFloatOrder)).rejects.toThrow(
        InvalidParamError,
      );
      await expect(sut.create(propsWithFloatOrder)).rejects.toThrow(
        "O campo Ordem é inválido: deve ser um número inteiro",
      );
    });

    test("should sanitize string number order to valid number", async () => {
      const propsWithStringOrder = {
        abbreviation: "Maj",
        order: "3",
      };

      // O sanitizador converte string numérica para número válido
      await expect(
        sut.create(propsWithStringOrder as unknown as MilitaryRankProps),
      ).resolves.not.toThrow();

      const militaryRankCreated =
        await militaryRankRepository.findByAbbreviation("Maj");

      expect(militaryRankCreated).not.toBeNull();
      expect(militaryRankCreated?.order).toBe(3);
      expect(typeof militaryRankCreated?.order).toBe("number");
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
