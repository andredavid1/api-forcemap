import { CreateMilitaryRankService } from "@application/services";
import { MilitaryRankProps } from "@domain/entities";
import { ILogger } from "@domain/services";

interface SutTypes {
  sut: CreateMilitaryRankService;
  loggerMock: jest.Mocked<ILogger>;
}

const makeSut = (): SutTypes => {
  const militaryRankRepository = {
    create: jest.fn(),
    findByAbbreviation: jest.fn().mockResolvedValue(null),
    findByOrder: jest.fn().mockResolvedValue(null),
  };
  const militaryRankPropsSanitizer = {
    sanitize: jest.fn(),
  };
  const militaryRankPropsValidator = {
    validateOrThrow: jest.fn(),
  };

  // ✅ Mock do logger seguindo a interface
  const loggerMock: jest.Mocked<ILogger> = {
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    withContext: jest.fn().mockReturnThis(),
  };

  const sut = new CreateMilitaryRankService({
    militaryRankRepository,
    militaryRankPropsSanitizer,
    militaryRankPropsValidator,
    logger: loggerMock, // ✅ Logger injetado
  });

  return { sut, loggerMock };
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
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(loggerMock.withContext).toHaveBeenCalledTimes(2);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(loggerMock.info).toHaveBeenCalledWith(
      expect.stringContaining("Iniciando criação"),
    );
  });
});
