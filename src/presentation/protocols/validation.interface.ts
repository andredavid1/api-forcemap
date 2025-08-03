/**
 * Validador de input HTTP genérico
 *
 * @description
 * Interface para validação de dados de entrada HTTP,
 * garantindo type safety e consistência.
 */
export interface IHttpInputValidator<T = unknown> {
  /**
   * Valida os dados de entrada
   * @param input - Dados a serem validados
   * @returns true se válido, string com erro se inválido
   */
  validate(input: unknown): input is T;

  /**
   * Obtém mensagem de erro de validação
   * @param input - Dados que falharam na validação
   * @returns Mensagem de erro descritiva
   */
  getErrorMessage(input: unknown): string;
}

/**
 * Middleware de validação HTTP
 *
 * @description
 * Interface para middleware que valida requests HTTP
 * antes de chegar ao controller.
 */
export interface IHttpValidationMiddleware<T = unknown> {
  /**
   * Executa validação do request
   * @param input - Dados do request
   * @throws {Error} Se validação falhar
   */
  validate(input: unknown): asserts input is T;
}
