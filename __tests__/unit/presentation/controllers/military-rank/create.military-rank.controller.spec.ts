import { CreateMilitaryRankInputDTO } from "@application/dtos/military-rank";
import { ILogger } from "@domain/services";
import { ICreateMilitaryRank } from "@domain/usecases";
import { CreateMilitaryRankController } from "@presentation/controllers/military-rank/create.military-rank.controller";
import {
  IHttpRequest,
  IHttpResponse,
  IHttpResponseFactory,
} from "@presentation/protocols";

interface SutTypes {
  sut: CreateMilitaryRankController;
  createMilitaryRankService: ICreateMilitaryRank; // ✅ Interface ao invés de implementação
  responseFactory: IHttpResponseFactory; // ✅ Factory pattern para testes
}

const makeSut = (): SutTypes => {
  // ✅ Mock do logger para o controller
  const loggerMock: jest.Mocked<ILogger> = {
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    withContext: jest.fn().mockReturnThis(),
  };

  // ✅ Mock da interface ICreateMilitaryRank (Dependency Inversion)
  const createMilitaryRankServiceMock: jest.Mocked<ICreateMilitaryRank> = {
    create: jest.fn().mockResolvedValue(undefined),
  };

  // ✅ Mock da factory de resposta HTTP
  const responseFactoryMock: jest.Mocked<IHttpResponseFactory> = {
    createServerError: jest.fn().mockReturnValue({
      body: { error: "Erro interno no servidor." },
      statusCode: 500,
    }),
    createCreated: jest.fn().mockReturnValue({
      body: { data: null },
      statusCode: 201,
    }),
    createSuccess: jest.fn().mockReturnValue({
      body: { data: null },
      statusCode: 200,
    }),
  };

  const sut = new CreateMilitaryRankController({
    createMilitaryRankService: createMilitaryRankServiceMock, // ✅ Interface mockada
    logger: loggerMock, // ✅ Logger injetado no controller
    responseFactory: responseFactoryMock, // ✅ Factory injetada
  });

  return {
    sut,
    createMilitaryRankService: createMilitaryRankServiceMock,
    responseFactory: responseFactoryMock,
  };
};

describe("CreateMilitaryRankController", () => {
  let sutInstance: SutTypes;

  beforeEach(() => {
    sutInstance = makeSut();
  });

  it("should be return 201 if military rank was created", async () => {
    const { sut } = sutInstance;

    const httpRequest: IHttpRequest<CreateMilitaryRankInputDTO> = {
      body: {
        data: {
          abbreviation: "Sd",
          order: 1,
        },
      },
    };

    const httpResponse: IHttpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(201);
  });

  it("should be return 422 if body is empty provided", async () => {
    const { sut } = sutInstance;

    const httpRequest: IHttpRequest<CreateMilitaryRankInputDTO> = {
      body: {},
    };

    const httpResponse: IHttpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(422);
  });

  it("should be return 500 on unexpcted service error", async () => {
    const { sut, createMilitaryRankService } = sutInstance;

    const expectedError = new Error("Erro interno no servidor.");

    jest
      .spyOn(createMilitaryRankService, "create")
      .mockRejectedValueOnce(expectedError);

    const httpRequest: IHttpRequest<CreateMilitaryRankInputDTO> = {
      body: { data: { abbreviation: "Cel", order: 1 } },
    };

    const httpResponse: IHttpResponse = await sut.handle(httpRequest);

    expect(httpResponse.body?.error).toEqual(expectedError.message);
    expect(httpResponse.statusCode).toBe(500);
  });
});
