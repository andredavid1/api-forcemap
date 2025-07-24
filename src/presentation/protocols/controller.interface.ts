import { IHttpRequest, IHttpResponse } from "./http.interface";

export interface IController<REQ = unknown, RES = unknown> {
  handle: (httpRequest: IHttpRequest<REQ>) => Promise<IHttpResponse<RES>>;
}
