import { MilitaryRankProps } from "@domain/entities";

/**
 * Interface para validação de propriedades de posto/graduação militar
 *
 * @interface IMilitaryRankPropsValidator
 */
export interface IMilitaryRankPropsValidator {
  /**
   * Valida as propriedades de um posto/graduação militar
   *
   * @param {MilitaryRankProps} props - Propriedades a serem validadas
   * @returns {Promise<void>} Promessa vazia se válido
   * @throws {MissingParamError} Se campo obrigatório estiver ausente
   * @throws {InvalidParamError} Se campo tiver valor inválido
   * @throws {DuplicatedKeyError} Se abreviatura já existir
   */
  validateOrThrow: (props: MilitaryRankProps) => Promise<void>;
}
