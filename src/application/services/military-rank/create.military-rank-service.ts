import { MilitaryRankProps } from "@domain/entities";
import { IMilitaryRankRepository } from "@domain/repositories";
import { ICreateMilitaryRank } from "@domain/usecases";
import { ILogger, LogContext } from "@domain/services";
import {
  IMilitaryRankPropsSanitizer,
  IMilitaryRankPropsValidator,
} from "@application/protocols";

/**
 * Propriedades necessárias para o serviço de criação
 *
 * @interface CreateMilitaryRankServiceProps
 */
interface CreateMilitaryRankServiceProps {
  militaryRankRepository: IMilitaryRankRepository;
  militaryRankPropsSanitizer: IMilitaryRankPropsSanitizer;
  militaryRankPropsValidator: IMilitaryRankPropsValidator;
  logger: ILogger; // ✅ Logger injetado como dependência
}

/**
 * Serviço para criação de posto/graduação militar
 *
 * @class CreateMilitaryRankService
 * @implements {ICreateMilitaryRank}
 * @description Implementa o caso de uso de criação seguindo Clean Architecture
 */
export class CreateMilitaryRankService implements ICreateMilitaryRank {
  private readonly logger: ILogger;

  /**
   * @constructor
   * @param {CreateMilitaryRankServiceProps} props - Dependências injetadas
   */
  constructor(private readonly props: CreateMilitaryRankServiceProps) {
    // ✅ Logger recebido por injeção de dependência
    this.logger = props.logger.withContext({
      metadata: {
        service: "CreateMilitaryRankService",
        module: "military-rank",
        layer: "application",
      },
    });
  }

  /**
   * Cria um novo posto/graduação militar
   *
   * @param {MilitaryRankProps} militaryRankProps - Propriedades do posto/graduação
   * @returns {Promise<void>} Promessa vazia (Command pattern)
   * @throws {MissingParamError} Se campo obrigatório estiver ausente
   * @throws {InvalidParamError} Se campo tiver valor inválido
   * @throws {DuplicatedKeyError} Se abreviatura já existir
   *
   * @description
   * 1. Sanitiza os dados de entrada
   * 2. Valida regras de negócio
   * 3. Persiste no repositório
   */
  public readonly create = async (
    militaryRankProps: MilitaryRankProps,
  ): Promise<void> => {
    const startTime = Date.now();
    const operationId = `create-${Date.now()}-${Math.random()
      .toString(36)
      .substring(7)}`;

    // Logger específico para esta operação
    const operationLogger = this.logger.withContext({
      operation: "create-military-rank",
      metadata: {
        operationId,
        input: {
          abbreviation: militaryRankProps?.abbreviation || "unknown",
          order: militaryRankProps?.order || "unknown",
        },
      },
    });

    operationLogger.info("Iniciando criação de posto militar");

    try {
      const {
        militaryRankRepository,
        militaryRankPropsSanitizer,
        militaryRankPropsValidator,
      } = this.props;

      // Log de sanitização
      operationLogger.debug("Iniciando sanitização dos dados");
      const sanitizedProps =
        militaryRankPropsSanitizer.sanitize(militaryRankProps);
      operationLogger.debug("Sanitização concluída com sucesso");

      // Log de validação
      operationLogger.debug("Iniciando validação dos dados");
      await militaryRankPropsValidator.validateOrThrow(sanitizedProps);
      operationLogger.debug("Validação concluída com sucesso");

      // Log de persistência
      operationLogger.debug("Salvando no repositório");
      await militaryRankRepository.create(sanitizedProps);

      const duration = Date.now() - startTime;

      operationLogger.info("Posto militar criado com sucesso", {
        duration,
        metadata: {
          result: {
            abbreviation: sanitizedProps?.abbreviation || "unknown",
            order: sanitizedProps?.order || "unknown",
          },
        },
      });
    } catch (error) {
      const duration = Date.now() - startTime;

      if (error instanceof Error) {
        const errorContext: LogContext = {
          metadata: {
            duration,
            errorType: error.constructor.name,
          },
        };
        operationLogger.error(
          "Erro ao criar posto militar",
          error,
          errorContext,
        );
      } else {
        const errorContext: LogContext = {
          metadata: {
            duration,
            error: String(error),
          },
        };
        operationLogger.error(
          "Erro desconhecido ao criar posto militar",
          undefined,
          errorContext,
        );
      }

      throw error;
    }
  };
}
