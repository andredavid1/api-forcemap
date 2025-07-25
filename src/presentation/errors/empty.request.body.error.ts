import { CustomAppError } from "@domain/errors";

export class EmptyRequestBodyError extends CustomAppError {
  constructor() {
    super("Campos obrigatórios não foram preenchidos.", 422);
    this.name = "EmptyRequestBodyError";
  }
}
