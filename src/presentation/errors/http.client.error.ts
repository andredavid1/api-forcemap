import { CustomAppError } from "@domain/errors";

export class HttpClientError extends CustomAppError {
  constructor(error: CustomAppError) {
    super(error.message, error.statusCode);
    this.name = "HttpClientError";
  }
}
