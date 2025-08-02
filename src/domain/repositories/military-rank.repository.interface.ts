import {
  ICreateMilitaryRank,
  IFindMilitaryRankByAbbreviation,
  IFindMilitaryRankByOrder,
} from "@domain/usecases";

/**
 * Interface do repositório para operações de posto/graduação militar
 *
 * @interface IMilitaryRankRepository
 * @description
 * Interface que define o contrato para persistência e consulta de dados
 * de postos/graduações militares. Segue o padrão Repository da Clean Architecture,
 * abstraindo os detalhes de implementação da camada de dados.
 *
 * @extends {ICreateMilitaryRank} Interface para criação de posto militar
 * @extends {IFindMilitaryRankByAbbreviation} Interface para busca por abreviatura
 * @extends {IFindMilitaryRankByOrder} Interface para busca por ordem hierárquica
 *
 * @see {@link ICreateMilitaryRank} Para detalhes da operação de criação
 * @see {@link IFindMilitaryRankByAbbreviation} Para detalhes da busca por abreviatura
 * @see {@link IFindMilitaryRankByOrder} Para detalhes da busca por ordem
 */
export type IMilitaryRankRepository = ICreateMilitaryRank &
  IFindMilitaryRankByAbbreviation &
  IFindMilitaryRankByOrder;
