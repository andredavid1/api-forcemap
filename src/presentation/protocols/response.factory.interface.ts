import { IHttpResponse } from "./http.interface";

/**
 * Factory interface para criação de respostas HTTP padronizadas
 *
 * @description
 * Abstrai a criação de diferentes tipos de resposta HTTP,
 * permitindo implementações customizadas e testáveis.
 */
export interface IHttpResponseFactory {
  /**
   * Cria uma resposta de erro interno do servidor (500)
   * @param error - Error que causou a falha
   * @returns IHttpResponse com status 500
   */
  createServerError(error: Error): IHttpResponse<null>;

  /**
   * Cria uma resposta de sucesso para criação (201)
   * @param data - Dados de resposta (opcional)
   * @returns IHttpResponse com status 201
   */
  createCreated<T>(data?: T): IHttpResponse<T>;

  /**
   * Cria uma resposta de sucesso padrão (200)
   * @param data - Dados de resposta
   * @returns IHttpResponse com status 200
   */
  createSuccess<T>(data: T): IHttpResponse<T>;
}
