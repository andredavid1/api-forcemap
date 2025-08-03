/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CreateMilitaryRankService } from "@application/services";
import { MilitaryRankProps } from "@domain/entities";
import { ILogger } from "@domain/services";
import { IMilitaryRankRepository } from "@domain/repositories";
import {
  IMilitaryRankPropsSanitizer,
  IMilitaryRankPropsValidator,
} from "@application/protocols";

describe("CreateMilitaryRankService Error Coverage", () => {
  it("should handle non-Error exceptions", async () => {
    const loggerMock: jest.Mocked<ILogger> = {
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      withContext: jest.fn().mockReturnThis(),
    };

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

    const sut = new CreateMilitaryRankService({
      militaryRankRepository: militaryRankRepositoryMock,
      militaryRankPropsSanitizer: militaryRankPropsSanitizerMock,
      militaryRankPropsValidator: militaryRankPropsValidatorMock,
      logger: loggerMock,
    });

    const militaryRankProps: MilitaryRankProps = {
      abbreviation: "Test",
      order: 1,
    };

    // Simula um erro que não é instância de Error (string)
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

  it("should handle null exceptions", async () => {
    const loggerMock: jest.Mocked<ILogger> = {
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      withContext: jest.fn().mockReturnThis(),
    };

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

    const sut = new CreateMilitaryRankService({
      militaryRankRepository: militaryRankRepositoryMock,
      militaryRankPropsSanitizer: militaryRankPropsSanitizerMock,
      militaryRankPropsValidator: militaryRankPropsValidatorMock,
      logger: loggerMock,
    });

    const militaryRankProps: MilitaryRankProps = {
      abbreviation: "Test",
      order: 1,
    };

    // Simula um erro null
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
});
