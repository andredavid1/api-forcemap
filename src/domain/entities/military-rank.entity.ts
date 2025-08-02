/**
 * Propriedades básicas de um posto/graduação militar
 *
 * @typedef {Object} MilitaryRankProps
 * @property {string} abbreviation - Abreviatura do posto/graduação (ex: "Cel", "Maj")
 * @property {number} order - Ordem hierárquica (deve ser inteiro positivo)
 */
export type MilitaryRankProps = {
  abbreviation: string;
  order: number;
};

/**
 * Entidade completa de posto/graduação militar
 *
 * @typedef {Object} MilitaryRank
 * @extends MilitaryRankProps
 * @property {string} id - Identificador único
 * @property {Date} [createdAt] - Data de criação
 * @property {Date} [updatedAt] - Data da última atualização
 */
export type MilitaryRank = MilitaryRankProps & {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
};
