import { CustomAppError } from "../../domain/errors/custom.app.error";

export class MissingParamError extends CustomAppError {
  constructor(paramName: string) {
    super(`O campo ${paramName} precisa ser preenchido.`, 422);
    this.name = "MissingParamError";
  }
}
