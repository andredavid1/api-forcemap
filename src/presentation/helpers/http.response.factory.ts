import { CustomAppError } from "@domain/errors";
import { ILogger } from "@domain/services";
import { IHttpResponse, IHttpResponseFactory } from "@presentation/protocols";

/**
 * Cria resposta HTTP para erros de cliente (4xx)
 *
 * @param error - Erro customizado da aplicação
 * @returns IHttpResponse com status e mensagem do erro
 */
export const HttpClientError = (error: CustomAppError): IHttpResponse<null> => {
  return {
    body: { error: error.message },
    statusCode: error.statusCode,
  };
};

/**
 * Factory concreta para criação de respostas HTTP padronizadas
 *
 * @class HttpResponseFactory
 * @implements {IHttpResponseFactory}
 * @description
 * Implementação concreta do factory pattern para respostas HTTP.
 * Inclui logging estruturado para observabilidade.
 */
export class HttpResponseFactory implements IHttpResponseFactory {
  constructor(private readonly logger: ILogger) {}

  public createServerError(error: Error): IHttpResponse<null> {
    this.logger.error("HTTP Server Error", error, {
      operation: "error-handling",
      metadata: {
        layer: "presentation",
        errorType: error.constructor.name,
        statusCode: 500,
      },
    });

    return {
      body: { error: "Erro interno no servidor." },
      statusCode: 500,
    };
  }

  public createCreated<T>(data?: T): IHttpResponse<T> {
    this.logger.info("HTTP Created Response", {
      operation: "response-creation",
      metadata: {
        layer: "presentation",
        statusCode: 201,
        hasData: !!data,
      },
    });

    return {
      body: { data },
      statusCode: 201,
    };
  }

  public createSuccess<T>(data: T): IHttpResponse<T> {
    this.logger.info("HTTP Success Response", {
      operation: "response-creation",
      metadata: {
        layer: "presentation",
        statusCode: 200,
        hasData: !!data,
      },
    });

    return {
      body: { data },
      statusCode: 200,
    };
  }
}
