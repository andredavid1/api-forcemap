import {
  IRouteHandler,
  IHttpRequest,
  IHttpResponse,
} from "@infrastructure/protocols/http";

/**
 * Handler para rota de health check
 *
 * @description
 * Rota simples para verificar se a aplicação está funcionando.
 * Demonstra como criar handlers desacoplados do framework HTTP.
 */
export const healthCheckHandler: IRouteHandler = (
  _request: IHttpRequest,
): IHttpResponse => {
  return {
    statusCode: 200,
    body: {
      data: {
        status: "healthy",
        timestamp: new Date().toISOString(),
        version: "1.0.0",
        uptime: process.uptime(),
      },
    },
  };
};

/**
 * Handler para rota de informações da API
 */
export const apiInfoHandler: IRouteHandler = (
  _request: IHttpRequest,
): IHttpResponse => {
  return {
    statusCode: 200,
    body: {
      data: {
        name: "API Forcemap",
        version: "1.0.0",
        description: "Clean Architecture Implementation",
        architecture: "Domain -> Application -> Infrastructure -> Presentation",
        features: [
          "SOLID Principles",
          "Dependency Inversion",
          "Clean Architecture",
          "Type Safety",
          "Comprehensive Testing",
        ],
      },
    },
  };
};
