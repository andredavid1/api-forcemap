/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/unbound-method */
import { CreateMilitaryRankService } from "@application/services";
import { MilitaryRankProps } from "@domain/entities";
import { ILogger } from "@domain/services";
import { IMilitaryRankRepository } from "@domain/repositories";
import {
  IMilitaryRankPropsSanitizer,
  IMilitaryRankPropsValidator,
} from "@application/protocols";

interface SutTypes {
  sut: CreateMilitaryRankService;
  loggerMock: jest.Mocked<ILogger>;
  militaryRankRepositoryMock: jest.Mocked<IMilitaryRankRepository>;
  militaryRankPropsSanitizerMock: jest.Mocked<IMilitaryRankPropsSanitizer>;
  militaryRankPropsValidatorMock: jest.Mocked<IMilitaryRankPropsValidator>;
}

const makeSut = (): SutTypes => {
  const militaryRankRepositoryMock = {
    create: jest.fn(),
    findByAbbreviation: jest.fn().mockResolvedValue(null),
    findByOrder: jest.fn().mockResolvedValue(null),
  } as jest.Mocked<IMilitaryRankRepository>;

  const militaryRankPropsSanitizerMock = {
    sanitize: jest.fn(),
  } as jest.Mocked<IMilitaryRankPropsSanitizer>;

  const militaryRankPropsValidatorMock = {
    validateOrThrow: jest.fn(),
  } as jest.Mocked<IMilitaryRankPropsValidator>;

  // ✅ Mock do logger seguindo a interface
  const loggerMock: jest.Mocked<ILogger> = {
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    withContext: jest.fn().mockReturnThis(),
  };

  const sut = new CreateMilitaryRankService({
    militaryRankRepository: militaryRankRepositoryMock,
    militaryRankPropsSanitizer: militaryRankPropsSanitizerMock,
    militaryRankPropsValidator: militaryRankPropsValidatorMock,
    logger: loggerMock, // ✅ Logger injetado
  });

  return {
    sut,
    loggerMock,
    militaryRankRepositoryMock,
    militaryRankPropsSanitizerMock,
    militaryRankPropsValidatorMock,
  };
};

describe("CreateMilitaryRankService", () => {
  let sutInstance: SutTypes;

  beforeEach(() => {
    sutInstance = makeSut();
  });

  it("should be able to create a military rank", async () => {
    const { sut, loggerMock } = sutInstance;
    const militaryRankProps: MilitaryRankProps = {
      abbreviation: "Sd",
      order: 13,
    };

    await expect(sut.create(militaryRankProps)).resolves.not.toThrow();

    // ✅ Verifica se o logger foi utilizado
    // withContext é chamado no constructor (1x) e no método create (1x) = 2x total
    expect(loggerMock.withContext).toHaveBeenCalledTimes(2);
    expect(loggerMock.info).toHaveBeenCalledWith(
      expect.stringContaining("Iniciando criação"),
    );
  });

  describe("Error handling scenarios", () => {
    it("should handle Error instance exceptions with proper logging", async () => {
      const { sut, loggerMock, militaryRankPropsValidatorMock } = makeSut();
      const militaryRankProps: MilitaryRankProps = {
        abbreviation: "Err",
        order: 99,
      };

      // Mock para simular um erro durante a validação
      const mockError = new Error("Validation failed");
      militaryRankPropsValidatorMock.validateOrThrow.mockRejectedValue(
        mockError,
      );

      await expect(sut.create(militaryRankProps)).rejects.toThrow(
        "Validation failed",
      );

      // Verifica se o erro foi logado com o contexto correto (linhas 117-126)
      expect(loggerMock.error).toHaveBeenCalledWith(
        "Erro ao criar posto militar",
        mockError,
        expect.objectContaining({
          metadata: expect.objectContaining({
            duration: expect.any(Number),
            errorType: expect.any(String),
          }),
        }),
      );
    });

    it("should handle non-Error exceptions with proper logging", async () => {
      const { sut, loggerMock, militaryRankPropsValidatorMock } = makeSut();
      const militaryRankProps: MilitaryRankProps = {
        abbreviation: "Str",
        order: 88,
      };

      // Mock para simular um erro que NÃO é instância de Error
      const mockStringError = "String error thrown";
      militaryRankPropsValidatorMock.validateOrThrow.mockRejectedValue(
        mockStringError,
      );

      await expect(sut.create(militaryRankProps)).rejects.toEqual(
        "String error thrown",
      );

      // Verifica se o erro desconhecido foi logado (linhas 132-143)
      expect(loggerMock.error).toHaveBeenCalledWith(
        "Erro desconhecido ao criar posto militar",
        undefined,
        expect.objectContaining({
          metadata: expect.objectContaining({
            duration: expect.any(Number),
            error: "String error thrown",
          }),
        }),
      );
    });

    it("should handle null exceptions with proper logging", async () => {
      const { sut, loggerMock, militaryRankRepositoryMock } = makeSut();
      const militaryRankProps: MilitaryRankProps = {
        abbreviation: "Null",
        order: 77,
      };

      // Mock para simular um erro null
      const mockNullError = null;
      militaryRankRepositoryMock.create.mockRejectedValue(mockNullError);

      await expect(sut.create(militaryRankProps)).rejects.toBeNull();

      // Verifica se o erro desconhecido foi logado (linhas 132-143)
      expect(loggerMock.error).toHaveBeenCalledWith(
        "Erro desconhecido ao criar posto militar",
        undefined,
        expect.objectContaining({
          metadata: expect.objectContaining({
            duration: expect.any(Number),
            error: "null",
          }),
        }),
      );
    });

    it("should handle numeric exceptions with proper logging", async () => {
      const { sut, loggerMock, militaryRankPropsSanitizerMock } = makeSut();
      const militaryRankProps: MilitaryRankProps = {
        abbreviation: "Num",
        order: 66,
      };

      // Mock para simular um erro numérico
      const mockNumericError = new Error("Numeric error: 42");
      militaryRankPropsSanitizerMock.sanitize.mockImplementation(() => {
        throw mockNumericError;
      });

      await expect(sut.create(militaryRankProps)).rejects.toEqual(
        mockNumericError,
      );

      // Verifica se o erro foi logado
      expect(loggerMock.error).toHaveBeenCalledWith(
        "Erro ao criar posto militar",
        mockNumericError,
        expect.objectContaining({
          metadata: expect.objectContaining({
            duration: expect.any(Number),
            errorType: "Error",
          }),
        }),
      );
    });

    it("should handle undefined exceptions with proper logging", async () => {
      const { sut, loggerMock, militaryRankRepositoryMock } = makeSut();
      const militaryRankProps: MilitaryRankProps = {
        abbreviation: "Undef",
        order: 55,
      };

      // Mock para simular um erro undefined
      const mockUndefinedError = undefined;
      militaryRankRepositoryMock.create.mockRejectedValue(mockUndefinedError);

      await expect(sut.create(militaryRankProps)).rejects.toBeUndefined();

      // Verifica se o erro desconhecido foi logado (linhas 132-143)
      expect(loggerMock.error).toHaveBeenCalledWith(
        "Erro desconhecido ao criar posto militar",
        undefined,
        expect.objectContaining({
          metadata: expect.objectContaining({
            duration: expect.any(Number),
            error: "undefined",
          }),
        }),
      );
    });

    it("should handle object exceptions with proper logging", async () => {
      const { sut, loggerMock, militaryRankRepositoryMock } = makeSut();
      const militaryRankProps: MilitaryRankProps = {
        abbreviation: "Obj",
        order: 44,
      };

      // Mock para simular um erro de objeto
      const mockObjectError = { message: "Object error", code: 500 };
      militaryRankRepositoryMock.create.mockRejectedValue(mockObjectError);

      await expect(sut.create(militaryRankProps)).rejects.toEqual(
        mockObjectError,
      );

      // Verifica se o erro desconhecido foi logado (linhas 132-143)
      expect(loggerMock.error).toHaveBeenCalledWith(
        "Erro desconhecido ao criar posto militar",
        undefined,
        expect.objectContaining({
          metadata: expect.objectContaining({
            duration: expect.any(Number),
            error: "[object Object]", // Corrigido: String() converte objetos para "[object Object]"
          }),
        }),
      );
    });
  });

  describe("Edge case scenarios", () => {
    it("should handle undefined/null input properties with unknown fallback", async () => {
      const { sut, loggerMock } = makeSut();

      // Testando com propriedades undefined/null para cobrir linhas 75-76
      const militaryRankProps = {
        abbreviation: undefined as unknown as string,
        order: null as unknown as number,
      };

      await expect(sut.create(militaryRankProps)).resolves.not.toThrow();

      // Verifica se o logger usou "unknown" como fallback (linhas 75-76)
      expect(loggerMock.withContext).toHaveBeenCalledWith(
        expect.objectContaining({
          operation: "create-military-rank",
          metadata: expect.objectContaining({
            input: {
              abbreviation: "unknown", // fallback linha 75
              order: "unknown", // fallback linha 76
            },
          }),
        }),
      );
    });
  });
});
