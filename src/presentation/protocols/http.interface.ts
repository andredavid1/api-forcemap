export interface IHttpRequest<REQ = unknown> {
  body: {
    data?: REQ;
  };
  header?: Record<string, string>;
  query?: Record<string, string>;
  params?: Record<string, string>;
}

export interface IHttpResponse<RES = unknown> {
  body?: {
    data?: RES;
    error?: string;
  };
  headers?: Record<string, string>;
  statusCode: number;
}
