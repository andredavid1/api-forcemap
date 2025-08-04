/**
 * Protocolo para servidor HTTP
 *
 * @description
 * Define a interface para implementações de servidores HTTP.
 * Permite inversão de dependência, possibilitando trocar de framework
 * sem afetar as outras camadas da aplicação.
 */
export interface IHttpServer {
  /**
   * Inicia o servidor HTTP
   *
   * @param port - Porta para o servidor escutar
   * @param host - Host para o servidor escutar (padrão: 0.0.0.0)
   * @returns Promise que resolve quando o servidor estiver rodando
   */
  start(port: number, host?: string): Promise<void>;

  /**
   * Para o servidor HTTP graciosamente
   *
   * @returns Promise que resolve quando o servidor for finalizado
   */
  stop(): Promise<void>;

  /**
   * Registra uma rota GET
   *
   * @param path - Caminho da rota
   * @param handler - Função handler da rota
   */
  get(path: string, handler: IRouteHandler): void;

  /**
   * Registra uma rota POST
   *
   * @param path - Caminho da rota
   * @param handler - Função handler da rota
   */
  post(path: string, handler: IRouteHandler): void;

  /**
   * Registra uma rota PUT
   *
   * @param path - Caminho da rota
   * @param handler - Função handler da rota
   */
  put(path: string, handler: IRouteHandler): void;

  /**
   * Registra uma rota DELETE
   *
   * @param path - Caminho da rota
   * @param handler - Função handler da rota
   */
  delete(path: string, handler: IRouteHandler): void;
}

/**
 * Dados da requisição HTTP
 */
export interface IHttpRequest {
  params?: Record<string, unknown>;
  query?: Record<string, unknown>;
  body?: unknown;
  headers?: Record<string, string>;
}

/**
 * Dados da resposta HTTP
 */
export interface IHttpResponse<T = unknown> {
  statusCode: number;
  body?: {
    data?: T;
    error?: string;
  };
  headers?: Record<string, string>;
}

/**
 * Handler para rotas HTTP
 */
export type IRouteHandler = (
  request: IHttpRequest,
) => Promise<IHttpResponse> | IHttpResponse;
