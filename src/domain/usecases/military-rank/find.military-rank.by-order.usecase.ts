import { MilitaryRank } from "@domain/entities";

/**
 * Interface para o caso de uso de busca de posto militar por ordem hierárquica
 *
 * @interface IFindMilitaryRankByOrder
 * @description
 * Define o contrato para implementação do caso de uso de consulta de postos
 * e graduações militares através da ordem hierárquica. Esta interface segue os
 * princípios da Clean Architecture e representa uma operação de consulta (Query)
 * no padrão CQRS (Command Query Responsibility Segregation).
 *
 * @see {@link MilitaryRank} Para detalhes da entidade retornada
 * @see {@link IMilitaryRankRepository} Para interface do repositório
 * @see {@link IFindMilitaryRankByAbbreviation} Para busca por abreviatura
 *
 */
export interface IFindMilitaryRankByOrder {
  /**
   * Busca um posto militar pela sua ordem hierárquica
   *
   * @method findByOrder
   * @param {number} order - Ordem hierárquica do posto (1 = mais alto, números maiores = mais baixos)
   * @returns {Promise<MilitaryRank | null>} Promessa que resolve com o posto encontrado ou null
   *
   * @description
   * Método responsável por localizar um posto militar específico através da
   * sua ordem hierárquica única. A ordem define a precedência militar onde
   * números menores representam postos superiores na hierarquia.
   *
   * @throws {InvalidParamError} Quando ordem é negativa, zero ou fora do range válido
   * @throws {CustomAppError} Para erros internos do sistema
   */
  findByOrder: (order: number) => Promise<MilitaryRank | null>;
}
