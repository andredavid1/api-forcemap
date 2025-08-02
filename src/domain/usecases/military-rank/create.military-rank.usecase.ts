import { MilitaryRankProps } from "@domain/entities";

/**
 * Interface para o caso de uso de criação de posto/graduação militar
 *
 * @interface ICreateMilitaryRank
 * @description
 * Define o contrato para implementação do caso de uso de criação de postos
 * e graduações militares. Esta interface segue os princípios da Clean Architecture,
 * permanecendo na camada de domínio e sendo agnóstica às implementações específicas.
 *
 * @see {@link MilitaryRankProps} Para detalhes das propriedades aceitas
 * @see {@link IMilitaryRankRepository} Para interface do repositório
 * @see {@link IMilitaryRankValidator} Para interface de validação
 */
export interface ICreateMilitaryRank {
  /**
   * Cria um novo posto/graduação militar no sistema
   *
   * @method create
   * @param {MilitaryRankProps} props - Propriedades do posto militar a ser criado
   * @returns {Promise<void>} Promessa que resolve quando a criação é concluída
   *
   * @description
   * Método responsável por executar o caso de uso de criação de posto militar.
   * Segue o padrão Command, onde a operação não retorna dados, apenas
   * confirma a execução bem-sucedida através da resolução da Promise.
   *
   * @throws {MissingParamError} Quando parâmetro obrigatório está ausente
   * @throws {InvalidParamError} Quando parâmetro tem formato inválido
   * @throws {DuplicatedKeyError} Quando abreviatura ou ordem já existem
   * @throws {CustomAppError} Para outros erros de negócio
   */
  create: (props: MilitaryRankProps) => Promise<void>;
}
