import { InvalidParamError } from "@application/errors";

describe("InvalidParamError", () => {
  it("should create an error with field name and reason", () => {
    const error = new InvalidParamError("idade", "deve ser maior que 18");

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(InvalidParamError);
    expect(error.name).toBe("InvalidParamError");
    expect(error.message).toBe(
      "O campo idade é inválido: deve ser maior que 18",
    );
  });

  it("should create an error with empty reason", () => {
    const error = new InvalidParamError("email", "");

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(InvalidParamError);
    expect(error.name).toBe("InvalidParamError");
    expect(error.message).toBe("O campo email é inválido: ");
  });

  it("should handle whitespace-only reason", () => {
    const error = new InvalidParamError("cpf", "   ");

    expect(error.message).toBe("O campo cpf é inválido:    ");
  });

  it("should handle special characters in field name", () => {
    const error = new InvalidParamError("data_nascimento", "formato inválido");

    expect(error.message).toBe(
      "O campo data_nascimento é inválido: formato inválido",
    );
  });

  it("should be throwable", () => {
    const throwError = () => {
      throw new InvalidParamError("senha", "deve ter no mínimo 8 caracteres");
    };

    expect(throwError).toThrow(InvalidParamError);
    expect(throwError).toThrow(
      "O campo senha é inválido: deve ter no mínimo 8 caracteres",
    );
  });

  it("should maintain stack trace", () => {
    const error = new InvalidParamError("telefone", "formato inválido");

    expect(error.stack).toBeDefined();
    expect(error.stack).toContain("InvalidParamError");
  });
});
