import { CreateMilitaryRankInputDTO } from "@application/dtos/military-rank";
import { MilitaryRankMapper } from "@application/mappers";
import { CustomAppError } from "@domain/errors";
import { ILogger } from "@domain/services";
import { ICreateMilitaryRank } from "@domain/usecases";
import { EmptyRequestBodyError } from "@presentation/errors";
import { HttpClientError } from "@presentation/helpers";
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IHttpResponseFactory,
} from "@presentation/protocols";

/**
 * Props para construção do controller de criação de posto militar
 *
 * @description
 * Usa interfaces ao invés de implementações concretas seguindo o
 * Dependency Inversion Principle. Isso permite:
 * - ✅ Testabilidade: Fácil mock das dependências
 * - ✅ Flexibilidade: Troca de implementações sem alterar o controller
 * - ✅ Baixo acoplamento: Depende apenas de contratos, não implementações
 */
interface ICreateMilitaryRankControllerProps {
  createMilitaryRankService: ICreateMilitaryRank; // ✅ Interface ao invés de implementação
  logger: ILogger;
  responseFactory: IHttpResponseFactory; // ✅ Factory pattern para respostas
}

/**
 * Controller para criação de posto/graduação militar
 *
 * @class CreateMilitaryRankController
 * @implements {IController<CreateMilitaryRankInputDTO, null>}
 * @description
 * Controller responsável por tratar requisições HTTP de criação de postos militares.
 * Implementa logging estruturado para observabilidade e rastreamento de operações.
 */
export class CreateMilitaryRankController
  implements IController<CreateMilitaryRankInputDTO, null>
{
  private readonly logger: ILogger;
  private readonly responseFactory: IHttpResponseFactory;

  /**
   * @constructor
   * @param {ICreateMilitaryRankControllerProps} props - Dependências do controller
   */
  constructor(private readonly props: ICreateMilitaryRankControllerProps) {
    this.logger = props.logger.withContext({
      metadata: {
        controller: "CreateMilitaryRankController",
        layer: "presentation",
        module: "military-rank",
      },
    });

    // Factory pattern para respostas HTTP padronizadas
    this.responseFactory = props.responseFactory;
  }

  public readonly handle = async (
    httpRequest: IHttpRequest<CreateMilitaryRankInputDTO>,
  ): Promise<IHttpResponse<null>> => {
    const { createMilitaryRankService } = this.props;

    this.logger.info("Handling create military rank request", {
      operation: "create-military-rank-http",
      metadata: {
        hasData: !!httpRequest.body.data,
      },
    });

    try {
      if (!httpRequest.body.data) {
        this.logger.warn("Empty request body received", {
          operation: "validation",
        });
        throw new EmptyRequestBodyError();
      }

      const inputDTO: CreateMilitaryRankInputDTO = httpRequest.body.data;
      const militaryRankProps = MilitaryRankMapper.toEntity(inputDTO);

      this.logger.debug("Calling service layer", {
        operation: "service-delegation",
        metadata: {
          abbreviation: militaryRankProps.abbreviation,
          order: militaryRankProps.order,
        },
      });

      await createMilitaryRankService.create(militaryRankProps);

      this.logger.info("Military rank created successfully", {
        operation: "create-military-rank-http",
        metadata: {
          statusCode: 201,
        },
      });

      // Factory pattern para success response
      return this.responseFactory.createCreated();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error instanceof CustomAppError) {
        this.logger.warn("Business logic error occurred", {
          operation: "error-handling",
          metadata: {
            errorType: error.constructor.name,
            statusCode: error.statusCode,
            errorMessage: error.message,
          },
        });
        return HttpClientError(error);
      }

      // Factory pattern para error handling
      return this.responseFactory.createServerError(error as Error);
    }
  };
}
