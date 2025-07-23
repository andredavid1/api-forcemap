export class CustomAppError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number = 400,
  ) {
    super(message);
    this.name = "CustomAppError";
    this.statusCode = statusCode;
  }
}
