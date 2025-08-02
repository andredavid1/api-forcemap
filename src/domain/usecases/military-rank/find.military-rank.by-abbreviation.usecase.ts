import { MilitaryRank } from "@domain/entities";

/**
 * Interface para o caso de uso de busca de posto militar por abreviatura
 *
 * @interface IFindMilitaryRankByAbbreviation
 * @description
 * Define o contrato para implementação do caso de uso de consulta de postos
 * e graduações militares através da abreviatura. Esta interface segue os
 * princípios da Clean Architecture e representa uma operação de consulta (Query)
 * no padrão CQRS (Command Query Responsibility Segregation).
 *
 * @see {@link MilitaryRank} Para detalhes da entidade retornada
 * @see {@link IMilitaryRankRepository} Para interface do repositório
 * @see {@link IFindMilitaryRankByOrder} Para busca por ordem hierárquica
 */
export interface IFindMilitaryRankByAbbreviation {
  /**
   * Busca um posto militar pela sua abreviatura
   *
   * @method findByAbbreviation
   * @param {string} abbreviation - Abreviatura do posto militar (ex: "Gen", "Cel", "Cap")
   * @returns {Promise<MilitaryRank | null>} Promessa que resolve com o posto encontrado ou null
   *
   * @description
   * Método responsável por localizar um posto militar específico através da
   * sua abreviatura única. Retorna a entidade completa se encontrada ou null
   * caso não exista posto com a abreviatura fornecida.
   *
   * @throws {InvalidParamError} Quando abreviatura está vazia ou é inválida
   * @throws {CustomAppError} Para erros internos do sistema
   *
   */
  findByAbbreviation: (abbreviation: string) => Promise<MilitaryRank | null>;
}
