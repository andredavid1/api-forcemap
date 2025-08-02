import { InvalidParamError, MissingParamError } from "@application/errors";
import { MilitaryRankPropsValidator } from "@application/validators";
import { MilitaryRankProps } from "@domain/entities";
import { IMilitaryRankRepository } from "@domain/repositories";
import { MilitaryRankFakeRepository } from "@infrastructure/database";

describe("InvalidParamError Integration Tests", () => {
  let validator: MilitaryRankPropsValidator;
  let repository: IMilitaryRankRepository;

  beforeEach(() => {
    repository = new MilitaryRankFakeRepository();
    validator = new MilitaryRankPropsValidator({
      militaryRankRepository: repository,
    });
  });

  describe("MilitaryRankPropsValidator - Error Distinction", () => {
    it("should throw MissingParamError for undefined order", async () => {
      const props = {
        abbreviation: "Cel",
        order: undefined,
      };

      await expect(
        validator.validateOrThrow(props as unknown as MilitaryRankProps),
      ).rejects.toThrow(MissingParamError);
      await expect(
        validator.validateOrThrow(props as unknown as MilitaryRankProps),
      ).rejects.toThrow("O campo Ordem precisa ser preenchido.");
    });

    it("should throw MissingParamError for null order", async () => {
      const props = {
        abbreviation: "Cel",
        order: null,
      };

      await expect(
        validator.validateOrThrow(props as unknown as MilitaryRankProps),
      ).rejects.toThrow(MissingParamError);
      await expect(
        validator.validateOrThrow(props as unknown as MilitaryRankProps),
      ).rejects.toThrow("O campo Ordem precisa ser preenchido.");
    });

    it("should throw InvalidParamError for zero order", async () => {
      const props = {
        abbreviation: "Cel",
        order: 0,
      };

      await expect(validator.validateOrThrow(props)).rejects.toThrow(
        InvalidParamError,
      );
      await expect(validator.validateOrThrow(props)).rejects.toThrow(
        "O campo Ordem é inválido: deve ser maior que zero",
      );
    });

    it("should throw InvalidParamError for negative order", async () => {
      const props = {
        abbreviation: "Cel",
        order: -5,
      };

      await expect(validator.validateOrThrow(props)).rejects.toThrow(
        InvalidParamError,
      );
      await expect(validator.validateOrThrow(props)).rejects.toThrow(
        "O campo Ordem é inválido: deve ser maior que zero",
      );
    });

    it("should throw InvalidParamError for non-integer order", async () => {
      const props = {
        abbreviation: "Cel",
        order: 1.5,
      };

      await expect(validator.validateOrThrow(props)).rejects.toThrow(
        InvalidParamError,
      );
      await expect(validator.validateOrThrow(props)).rejects.toThrow(
        "O campo Ordem é inválido: deve ser um número inteiro",
      );
    });

    it("should throw MissingParamError for empty abbreviation", async () => {
      const props = {
        abbreviation: "",
        order: 1,
      };

      await expect(validator.validateOrThrow(props)).rejects.toThrow(
        MissingParamError,
      );
      await expect(validator.validateOrThrow(props)).rejects.toThrow(
        "O campo Abreviatura precisa ser preenchido.",
      );
    });

    it("should pass validation for whitespace abbreviation (validator receives trimmed value)", async () => {
      const props = {
        abbreviation: "   ",
        order: 1,
      };

      // Nota: Este teste é sobre o validator isolado. No contexto do service,
      // o sanitizer trimaria para string vazia antes da validação.
      // O validator recebe o valor como está, sem sanitização.
      await expect(validator.validateOrThrow(props)).resolves.not.toThrow();
    });
  });

  describe("Error Type Verification", () => {
    it("should distinguish between missing and invalid errors correctly", async () => {
      // Missing field errors
      const missingOrderProps = { abbreviation: "Cel" };
      const missingAbbrevProps = { order: 1 };

      await expect(
        validator.validateOrThrow(
          missingOrderProps as unknown as MilitaryRankProps,
        ),
      ).rejects.toThrow(MissingParamError);
      await expect(
        validator.validateOrThrow(
          missingAbbrevProps as unknown as MilitaryRankProps,
        ),
      ).rejects.toThrow(MissingParamError);

      // Invalid value errors
      const invalidOrderProps = { abbreviation: "Cel", order: 0 };
      const nonIntegerOrderProps = { abbreviation: "Cel", order: 2.7 };

      await expect(
        validator.validateOrThrow(invalidOrderProps),
      ).rejects.toThrow(InvalidParamError);
      await expect(
        validator.validateOrThrow(nonIntegerOrderProps),
      ).rejects.toThrow(InvalidParamError);
    });

    it("should provide appropriate error messages", async () => {
      try {
        await validator.validateOrThrow({ abbreviation: "Cel", order: 0 });
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidParamError);
        expect((error as InvalidParamError).message).toContain("é inválido");
        expect((error as InvalidParamError).message).toContain(
          "deve ser maior que zero",
        );
      }

      try {
        await validator.validateOrThrow({ abbreviation: "Cel", order: 3.14 });
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidParamError);
        expect((error as InvalidParamError).message).toContain("é inválido");
        expect((error as InvalidParamError).message).toContain(
          "deve ser um número inteiro",
        );
      }
    });
  });
});
