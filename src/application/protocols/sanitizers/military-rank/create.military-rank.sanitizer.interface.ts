import { MilitaryRankProps } from "@domain/entities";

/**
 * Interface para sanitização de propriedades de posto/graduação militar
 *
 * @interface IMilitaryRankPropsSanitizer
 */
export interface IMilitaryRankPropsSanitizer {
  /**
   * Sanitiza as propriedades de um posto/graduação militar
   *
   * @param {MilitaryRankProps} props - Propriedades a serem sanitizadas
   * @returns {MilitaryRankProps} Propriedades sanitizadas
   *
   * @description
   * - Remove espaços em branco de strings
   * - Converte valores para tipos apropriados
   * - Preserva undefined/null para detecção de campos ausentes
   */
  sanitize: (props: MilitaryRankProps) => MilitaryRankProps;
}
