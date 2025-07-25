import { CustomAppError } from "@domain/errors";

export class HttpServerError extends CustomAppError {
  constructor() {
    super("Erro interno no servidor.", 500);
    this.name = "HttpServerError";
  }
}
