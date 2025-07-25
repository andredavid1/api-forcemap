import { CustomAppError } from "@domain/errors";
import { IHttpResponse } from "@presentation/protocols";

export const HttpClientError = (error: CustomAppError): IHttpResponse<null> => {
  return {
    body: { error: error.message },
    statusCode: error.statusCode,
  };
};

export const HttpServerError = (error: Error): IHttpResponse<null> => {
  console.log("Server Error: ", error.message);
  return {
    body: { error: "Erro interno no servidor." },
    statusCode: 500,
  };
};
