import { MilitaryRankProps } from "@domain/entities";
import { IMilitaryRankPropsSanitizer } from "@application/protocols";

export class MilitaryRankPropsSanitizer implements IMilitaryRankPropsSanitizer {
  public sanitize(props: MilitaryRankProps): MilitaryRankProps {
    const sanitized = {
      ...props,
      abbreviation: this.sanitizeString(props.abbreviation),
      order: this.sanitizeNumber(props.order),
    } as MilitaryRankProps;

    return sanitized;
  }

  /**
   * Sanitiza valores de string
   *
   * @private
   * @param {unknown} value - Valor a sanitizar
   * @returns {string} String sanitizada
   */
  private sanitizeString(value: unknown): string {
    // Tratamento específico para evitar conversão de objetos
    if (value === null || value === undefined) {
      return "";
    }

    // Para o caso específico de abbreviation, esperamos sempre uma string
    if (typeof value === "string") {
      return value.trim();
    }

    // Se for número, converte para string
    if (typeof value === "number") {
      return String(value).trim();
    }

    // Para outros casos (objetos, arrays, etc), retorna string vazia
    return "";
  }

  /**
   * Sanitiza valores numéricos
   *
   * @private
   * @param {unknown} value - Valor a sanitizar
   * @returns {number | undefined} Número sanitizado ou undefined
   *
   * @description
   * Preserva undefined para permitir validação de campo ausente
   */
  private sanitizeNumber(value: unknown): number | undefined {
    // Preserva undefined e null para permitir validação de campo ausente
    if (value === undefined || value === null) {
      return undefined;
    }

    // Se for string vazia, também trata como campo ausente
    if (value === "") {
      return undefined;
    }

    const num = Number(value);
    // Se não for um número válido (ex: "abc"), retorna undefined
    return Number.isNaN(num) ? undefined : num;
  }
}
