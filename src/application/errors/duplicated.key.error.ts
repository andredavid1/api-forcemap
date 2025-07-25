import { CustomAppError } from "@domain/errors";

export class DuplicatedKeyError extends CustomAppError {
  constructor(entity: string) {
    super(`Já existe um(a) ${entity} com esse valor.`, 409);
    this.name = "DuplicatedKeyError";
  }
}
