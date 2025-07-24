import { CreateMilitaryRankService } from "@application/services";
import { MilitaryRankProps } from "@domain/entities";
import { CreateMilitaryRankController } from "@presentation/controllers/military-rank/create.military-rank.controller";
import {
  IHttpRequest,
  IHttpResponse,
} from "@presentation/protocols/http.interface";

interface SutTypes {
  sut: CreateMilitaryRankController;
}

const makeSut = (): SutTypes => {
  const militaryRankRepository = {
    create: jest.fn(),
    findByAbbreviation: jest.fn().mockResolvedValue(null),
  };
  const militaryRankPropsSanitizer = {
    sanitize: jest.fn(),
  };
  const militaryRankPropsValidator = {
    validateOrThrow: jest.fn(),
  };
  const createMilitaryRankService = new CreateMilitaryRankService({
    militaryRankPropsSanitizer,
    militaryRankPropsValidator,
    militaryRankRepository,
  });
  const sut = new CreateMilitaryRankController({ createMilitaryRankService });

  return { sut };
};

describe("CreateMilitaryRankController", () => {
  let sutInstance: SutTypes;

  beforeEach(() => {
    sutInstance = makeSut();
  });

  it("should be return 201 if military rank was created", async () => {
    const { sut } = sutInstance;

    const httpRequest: IHttpRequest<MilitaryRankProps> = {
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

    const httpRequest: IHttpRequest<MilitaryRankProps> = {
      body: {},
    };

    const httpResponse: IHttpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(422);
  });

  //...TODO: testar condições onde abbreviation ou ordem não são enviados.
  //...TODO: testar condição onde o service falhe.
});
