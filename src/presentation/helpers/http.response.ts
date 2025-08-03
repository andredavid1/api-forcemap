import { CustomAppError } from "@domain/errors";
import { ILogger } from "@domain/services";
import { IHttpResponse } from "@presentation/protocols";

export const HttpClientError = (error: CustomAppError): IHttpResponse<null> => {
  return {
    body: { error: error.message },
    statusCode: error.statusCode,
  };
};

/**
 * Cria função HttpServerError com logging estruturado
 *
 * @param logger - Logger para registrar erros do servidor
 * @returns Função que trata erros HTTP 500
 */
export const createHttpServerError = (logger: ILogger) => {
  return (error: Error): IHttpResponse<null> => {
    logger.error("HTTP Server Error", error, {
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
  };
};

/**
 * @deprecated Use createHttpServerError com logger injetado
 * Mantida para compatibilidade, mas será removida em versões futuras
 */
export const HttpServerError = (error: Error): IHttpResponse<null> => {
  console.log("Server Error: ", error.message);
  return {
    body: { error: "Erro interno no servidor." },
    statusCode: 500,
  };
};
