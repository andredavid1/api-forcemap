/* eslint-disable @typescript-eslint/unbound-method */
import { CustomAppError } from "@domain/errors";
import { ILogger } from "@domain/services";
import { HttpClientError, HttpResponseFactory } from "@presentation/helpers";

describe("HttpClientError", () => {
  it("should create client error response with correct structure", () => {
    // Arrange
    const error = new CustomAppError("Invalid input", 400);

    // Act
    const result = HttpClientError(error);

    // Assert
    expect(result).toEqual({
      body: { error: "Invalid input" },
      statusCode: 400,
    });
  });

  it("should handle different status codes", () => {
    // Arrange
    const notFoundError = new CustomAppError("Resource not found", 404);
    const unauthorizedError = new CustomAppError("Unauthorized", 401);
    const forbiddenError = new CustomAppError("Forbidden", 403);

    // Act
    const notFoundResult = HttpClientError(notFoundError);
    const unauthorizedResult = HttpClientError(unauthorizedError);
    const forbiddenResult = HttpClientError(forbiddenError);

    // Assert
    expect(notFoundResult.statusCode).toBe(404);
    expect(notFoundResult.body?.error).toBe("Resource not found");

    expect(unauthorizedResult.statusCode).toBe(401);
    expect(unauthorizedResult.body?.error).toBe("Unauthorized");

    expect(forbiddenResult.statusCode).toBe(403);
    expect(forbiddenResult.body?.error).toBe("Forbidden");
  });

  it("should handle error messages with special characters", () => {
    // Arrange
    const error = new CustomAppError("Erro com acentuação: ção", 400);

    // Act
    const result = HttpClientError(error);

    // Assert
    expect(result.body?.error).toBe("Erro com acentuação: ção");
  });
});

describe("HttpResponseFactory", () => {
  let mockLogger: jest.Mocked<ILogger>;
  let factory: HttpResponseFactory;

  beforeEach(() => {
    mockLogger = {
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
      withContext: jest.fn().mockReturnThis(),
    } as jest.Mocked<ILogger>;
    factory = new HttpResponseFactory(mockLogger);
  });

  describe("createServerError", () => {
    it("should create server error response with correct structure", () => {
      // Arrange
      const error = new Error("Database connection failed");

      // Act
      const result = factory.createServerError(error);

      // Assert
      expect(result).toEqual({
        body: { error: "Erro interno no servidor." },
        statusCode: 500,
      });
    });

    it("should log error with correct context", () => {
      // Arrange
      const error = new Error("Database connection failed");
      error.name = "DatabaseError";

      // Act
      factory.createServerError(error);

      // Assert
      expect(mockLogger.error).toHaveBeenCalledWith(
        "HTTP Server Error",
        error,
        {
          operation: "error-handling",
          metadata: {
            layer: "presentation",
            errorType: "Error",
            statusCode: 500,
          },
        },
      );
    });

    it("should handle custom error types in logging", () => {
      // Arrange
      class CustomError extends Error {
        constructor(message: string) {
          super(message);
          this.name = "CustomError";
        }
      }
      const error = new CustomError("Custom error occurred");

      // Act
      factory.createServerError(error);

      // Assert
      expect(mockLogger.error).toHaveBeenCalledWith(
        "HTTP Server Error",
        error,
        {
          operation: "error-handling",
          metadata: {
            layer: "presentation",
            errorType: "CustomError",
            statusCode: 500,
          },
        },
      );
    });

    it("should handle error without proper constructor", () => {
      // Arrange
      const error = new Error("Test error");
      // Simulate an error without proper constructor name
      Object.defineProperty(error.constructor, "name", { value: undefined });

      // Act
      const result = factory.createServerError(error);

      // Assert
      expect(result.statusCode).toBe(500);
      expect(result.body?.error).toBe("Erro interno no servidor.");
      expect(mockLogger.error).toHaveBeenCalled();
    });
  });

  describe("createCreated", () => {
    it("should create created response with data", () => {
      // Arrange
      const data = { id: 1, name: "Test Resource" };

      // Act
      const result = factory.createCreated(data);

      // Assert
      expect(result).toEqual({
        body: { data },
        statusCode: 201,
      });
    });

    it("should create created response without data", () => {
      // Act
      const result = factory.createCreated();

      // Assert
      expect(result).toEqual({
        body: { data: undefined },
        statusCode: 201,
      });
    });

    it("should create created response with null data", () => {
      // Act
      const result = factory.createCreated(null);

      // Assert
      expect(result).toEqual({
        body: { data: null },
        statusCode: 201,
      });
    });

    it("should log created response with data", () => {
      // Arrange
      const data = { id: 1, name: "Test" };

      // Act
      factory.createCreated(data);

      // Assert
      expect(mockLogger.info).toHaveBeenCalledWith("HTTP Created Response", {
        operation: "response-creation",
        metadata: {
          layer: "presentation",
          statusCode: 201,
          hasData: true,
        },
      });
    });

    it("should log created response without data", () => {
      // Act
      factory.createCreated();

      // Assert
      expect(mockLogger.info).toHaveBeenCalledWith("HTTP Created Response", {
        operation: "response-creation",
        metadata: {
          layer: "presentation",
          statusCode: 201,
          hasData: false,
        },
      });
    });

    it("should handle complex data types", () => {
      // Arrange
      const complexData = {
        user: {
          id: 1,
          profile: {
            name: "João",
            settings: { theme: "dark" },
          },
        },
        metadata: ["tag1", "tag2"],
      };

      // Act
      const result = factory.createCreated(complexData);

      // Assert
      expect(result.body?.data).toEqual(complexData);
      expect(result.statusCode).toBe(201);
    });
  });

  describe("createSuccess", () => {
    it("should create success response with data", () => {
      // Arrange
      const data = { id: 1, name: "Test Resource" };

      // Act
      const result = factory.createSuccess(data);

      // Assert
      expect(result).toEqual({
        body: { data },
        statusCode: 200,
      });
    });

    it("should log success response", () => {
      // Arrange
      const data = { id: 1, name: "Test" };

      // Act
      factory.createSuccess(data);

      // Assert
      expect(mockLogger.info).toHaveBeenCalledWith("HTTP Success Response", {
        operation: "response-creation",
        metadata: {
          layer: "presentation",
          statusCode: 200,
          hasData: true,
        },
      });
    });

    it("should handle null data in success response", () => {
      // Act
      const result = factory.createSuccess(null);

      // Assert
      expect(result).toEqual({
        body: { data: null },
        statusCode: 200,
      });
      expect(mockLogger.info).toHaveBeenCalledWith("HTTP Success Response", {
        operation: "response-creation",
        metadata: {
          layer: "presentation",
          statusCode: 200,
          hasData: false,
        },
      });
    });

    it("should handle empty string data", () => {
      // Act
      const result = factory.createSuccess("");

      // Assert
      expect(result).toEqual({
        body: { data: "" },
        statusCode: 200,
      });
      expect(mockLogger.info).toHaveBeenCalledWith("HTTP Success Response", {
        operation: "response-creation",
        metadata: {
          layer: "presentation",
          statusCode: 200,
          hasData: false,
        },
      });
    });

    it("should handle zero value data", () => {
      // Act
      const result = factory.createSuccess(0);

      // Assert
      expect(result).toEqual({
        body: { data: 0 },
        statusCode: 200,
      });
      expect(mockLogger.info).toHaveBeenCalledWith("HTTP Success Response", {
        operation: "response-creation",
        metadata: {
          layer: "presentation",
          statusCode: 200,
          hasData: false,
        },
      });
    });

    it("should handle boolean false data", () => {
      // Act
      const result = factory.createSuccess(false);

      // Assert
      expect(result).toEqual({
        body: { data: false },
        statusCode: 200,
      });
      expect(mockLogger.info).toHaveBeenCalledWith("HTTP Success Response", {
        operation: "response-creation",
        metadata: {
          layer: "presentation",
          statusCode: 200,
          hasData: false,
        },
      });
    });

    it("should handle array data", () => {
      // Arrange
      const arrayData = [
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
      ];

      // Act
      const result = factory.createSuccess(arrayData);

      // Assert
      expect(result.body?.data).toEqual(arrayData);
      expect(result.statusCode).toBe(200);
      expect(mockLogger.info).toHaveBeenCalledWith("HTTP Success Response", {
        operation: "response-creation",
        metadata: {
          layer: "presentation",
          statusCode: 200,
          hasData: true,
        },
      });
    });

    it("should handle empty array data", () => {
      // Act
      const result = factory.createSuccess([]);

      // Assert
      expect(result.body?.data).toEqual([]);
      expect(mockLogger.info).toHaveBeenCalledWith("HTTP Success Response", {
        operation: "response-creation",
        metadata: {
          layer: "presentation",
          statusCode: 200,
          hasData: true,
        },
      });
    });
  });

  describe("logger integration", () => {
    it("should call logger methods exactly once per operation", () => {
      // Arrange
      const error = new Error("Test error");
      const data = { test: true };

      // Act
      factory.createServerError(error);
      factory.createCreated(data);
      factory.createSuccess(data);

      // Assert
      expect(mockLogger.error).toHaveBeenCalledTimes(1);
      expect(mockLogger.info).toHaveBeenCalledTimes(2);
    });

    it("should maintain logger state between calls", () => {
      // Arrange
      const firstData = { id: 1 };
      const secondData = { id: 2 };

      // Act
      factory.createSuccess(firstData);
      factory.createCreated(secondData);

      // Assert
      expect(mockLogger.info).toHaveBeenCalledTimes(2);
      expect(mockLogger.info).toHaveBeenNthCalledWith(
        1,
        "HTTP Success Response",
        expect.any(Object),
      );
      expect(mockLogger.info).toHaveBeenNthCalledWith(
        2,
        "HTTP Created Response",
        expect.any(Object),
      );
    });
  });

  describe("type safety and generics", () => {
    it("should maintain type safety with generics", () => {
      // Arrange
      interface User {
        id: number;
        name: string;
      }
      const user: User = { id: 1, name: "João" };

      // Act
      const result = factory.createSuccess<User>(user);

      // Assert
      expect(result.body?.data).toEqual(user);
      expect(typeof result.body?.data?.id).toBe("number");
      expect(typeof result.body?.data?.name).toBe("string");
    });

    it("should work with primitive types", () => {
      // Act
      const stringResult = factory.createSuccess<string>("test");
      const numberResult = factory.createSuccess<number>(42);
      const booleanResult = factory.createSuccess<boolean>(true);

      // Assert
      expect(stringResult.body?.data).toBe("test");
      expect(numberResult.body?.data).toBe(42);
      expect(booleanResult.body?.data).toBe(true);
    });
  });
});
