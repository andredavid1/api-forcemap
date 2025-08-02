import {
  DuplicatedKeyError,
  MissingParamError,
  InvalidParamError,
} from "@application/errors";
import { MilitaryRankProps } from "@domain/entities";
import { IMilitaryRankRepository } from "@domain/repositories";
import { IMilitaryRankPropsValidator } from "@application/protocols";

/**
 * Propriedades necessárias para o validador
 *
 * @interface ConstructorProps
 */
interface ConstructorProps {
  militaryRankRepository: IMilitaryRankRepository;
}

/**
 * Validador de propriedades de posto/graduação militar
 *
 * @class MilitaryRankPropsValidator
 * @implements {IMilitaryRankPropsValidator}
 * @description Implementa validações de regras de negócio
 */
export class MilitaryRankPropsValidator implements IMilitaryRankPropsValidator {
  /**
   * @constructor
   * @param {ConstructorProps} constructorProps - Dependências injetadas
   */
  constructor(private readonly constructorProps: ConstructorProps) {}

  /**
   * Valida as propriedades de um posto/graduação militar
   *
   * @param {MilitaryRankProps} props - Propriedades a serem validadas
   * @returns {Promise<void>} Promessa vazia se válido
   * @throws {MissingParamError} Se campo obrigatório estiver ausente
   * @throws {InvalidParamError} Se campo tiver valor inválido
   * @throws {DuplicatedKeyError} Se abreviatura já existir
   */
  public readonly validateOrThrow = async (
    props: MilitaryRankProps,
  ): Promise<void> => {
    this.validateRequiredFields(props);
    await this.validateAbbreviationUniqueness(props);
    await this.validateOrderUniqueness(props);
  };

  /**
   * Valida campos obrigatórios e regras de negócio
   *
   * @private
   * @param {MilitaryRankProps} props - Propriedades a validar
   * @throws {MissingParamError} Se campo obrigatório ausente
   * @throws {InvalidParamError} Se valor inválido
   */
  private validateRequiredFields(props: MilitaryRankProps): void {
    // Validação de campos obrigatórios
    if (!props.abbreviation) {
      throw new MissingParamError("Abreviatura");
    }

    if (props.order === undefined || props.order === null) {
      throw new MissingParamError("Ordem");
    }

    // Validações específicas para order
    if (typeof props.order === "number") {
      if (props.order <= 0) {
        throw new InvalidParamError("Ordem", "deve ser maior que zero");
      }
      if (!Number.isInteger(props.order)) {
        throw new InvalidParamError("Ordem", "deve ser um número inteiro");
      }
    }
  }

  /**
   * Valida unicidade da abreviatura
   *
   * @private
   * @param {MilitaryRankProps} props - Propriedades a validar
   * @returns {Promise<void>} Promessa vazia se único
   * @throws {DuplicatedKeyError} Se abreviatura já existe
   */
  private async validateAbbreviationUniqueness(
    props: MilitaryRankProps,
  ): Promise<void> {
    const { militaryRankRepository } = this.constructorProps;

    const militaryRank = await militaryRankRepository.findByAbbreviation(
      props.abbreviation,
    );
    if (militaryRank) {
      throw new DuplicatedKeyError("Posto/Graduação");
    }
  }

  /**
   * Valida unicidade da ordem hierárquica
   *
   * @private
   * @param {MilitaryRankProps} props - Propriedades a validar
   * @returns {Promise<void>} Promessa vazia se único
   * @throws {DuplicatedKeyError} Se ordem já existe
   */
  private async validateOrderUniqueness(
    props: MilitaryRankProps,
  ): Promise<void> {
    const { militaryRankRepository } = this.constructorProps;

    const militaryRank = await militaryRankRepository.findByOrder(props.order);
    if (militaryRank) {
      throw new DuplicatedKeyError("Ordem hierárquica");
    }
  }
}
