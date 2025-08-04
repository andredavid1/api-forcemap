/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ILogger } from "@domain/services";
import { FastifyHttpServer } from "@infrastructure/http";

// Mock do Fastify
const mockFastifyInstance = {
  listen: jest.fn(),
  close: jest.fn(),
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  addHook: jest.fn(),
  setErrorHandler: jest.fn(),
};

jest.mock("fastify", () => {
  return jest.fn(() => mockFastifyInstance);
});

describe("FastifyHttpServer", () => {
  let mockLogger: jest.Mocked<ILogger>;
  let server: FastifyHttpServer;

  beforeEach(() => {
    jest.clearAllMocks();

    mockLogger = {
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
      withContext: jest.fn().mockReturnThis(),
    } as jest.Mocked<ILogger>;

    server = new FastifyHttpServer(mockLogger);
  });

  afterEach(async () => {
    try {
      await server.stop();
    } catch {
      // Ignore errors during cleanup
    }
  });

  describe("Route Registration", () => {
    it("should register GET route successfully", () => {
      // Arrange
      const handler = jest.fn().mockReturnValue({
        statusCode: 200,
        body: { data: "test" },
      });

      // Act
      server.get("/test", handler);

      // Assert
      expect(mockLogger.debug).toHaveBeenCalledWith("Route registered", {
        operation: "route-registration",
        metadata: {
          method: "GET",
          path: "/test",
          framework: "fastify",
        },
      });
    });

    it("should register POST route successfully", () => {
      // Arrange
      const handler = jest.fn().mockReturnValue({
        statusCode: 201,
        body: { data: "created" },
      });

      // Act
      server.post("/test", handler);

      // Assert
      expect(mockLogger.debug).toHaveBeenCalledWith("Route registered", {
        operation: "route-registration",
        metadata: {
          method: "POST",
          path: "/test",
          framework: "fastify",
        },
      });
    });

    it("should register PUT route successfully", () => {
      // Arrange
      const handler = jest.fn().mockReturnValue({
        statusCode: 200,
        body: { data: "updated" },
      });

      // Act
      server.put("/test", handler);

      // Assert
      expect(mockLogger.debug).toHaveBeenCalledWith("Route registered", {
        operation: "route-registration",
        metadata: {
          method: "PUT",
          path: "/test",
          framework: "fastify",
        },
      });
    });

    it("should register DELETE route successfully", () => {
      // Arrange
      const handler = jest.fn().mockReturnValue({
        statusCode: 204,
        body: undefined,
      });

      // Act
      server.delete("/test", handler);

      // Assert
      expect(mockLogger.debug).toHaveBeenCalledWith("Route registered", {
        operation: "route-registration",
        metadata: {
          method: "DELETE",
          path: "/test",
          framework: "fastify",
        },
      });
    });
  });

  describe("Server Lifecycle", () => {
    it("should start server successfully", async () => {
      // Arrange
      const port = 3000;
      const host = "127.0.0.1";
      mockFastifyInstance.listen.mockResolvedValue(undefined);

      // Act
      await server.start(port, host);

      // Assert
      expect(mockFastifyInstance.listen).toHaveBeenCalledWith({ port, host });
      expect(mockLogger.info).toHaveBeenCalledWith(
        "HTTP Server started successfully",
        expect.objectContaining({
          operation: "server-startup",
          metadata: expect.objectContaining({
            framework: "fastify",
            port,
            host,
            environment: expect.any(String),
          }),
        }),
      );
    });

    it("should start server with default host", async () => {
      // Arrange
      const port = 3000;
      mockFastifyInstance.listen.mockResolvedValue(undefined);

      // Act
      await server.start(port);

      // Assert
      expect(mockFastifyInstance.listen).toHaveBeenCalledWith({
        port,
        host: "0.0.0.0",
      });
    });

    it("should stop server gracefully", async () => {
      // Arrange
      mockFastifyInstance.close.mockResolvedValue(undefined);

      // Act
      await server.stop();

      // Assert
      expect(mockFastifyInstance.close).toHaveBeenCalled();
      expect(mockLogger.info).toHaveBeenCalledWith(
        "HTTP Server stopped gracefully",
        expect.objectContaining({
          operation: "server-shutdown",
          metadata: expect.objectContaining({
            framework: "fastify",
          }),
        }),
      );
    });

    it("should handle server start errors", async () => {
      // Arrange
      const port = 3000;
      const host = "127.0.0.1";
      const startError = new Error("Port already in use");
      mockFastifyInstance.listen.mockRejectedValue(startError);

      // Act & Assert
      await expect(server.start(port, host)).rejects.toThrow(
        "Port already in use",
      );
      expect(mockLogger.error).toHaveBeenCalledWith(
        "Failed to start HTTP server",
        startError,
        {
          operation: "server-startup",
          metadata: {
            framework: "fastify",
            port,
            host,
          },
        },
      );
    });

    it("should handle server stop errors", async () => {
      // Arrange
      const stopError = new Error("Server not running");
      mockFastifyInstance.close.mockRejectedValue(stopError);

      // Act & Assert
      await expect(server.stop()).rejects.toThrow("Server not running");
      expect(mockLogger.error).toHaveBeenCalledWith(
        "Error stopping HTTP server",
        stopError,
        {
          operation: "server-shutdown",
          metadata: {
            framework: "fastify",
          },
        },
      );
    });
  });

  describe("Logger Integration", () => {
    it("should use injected logger for all operations", () => {
      // Arrange
      const handler = jest.fn().mockReturnValue({
        statusCode: 200,
        body: { data: "test" },
      });

      // Act
      server.get("/test", handler);

      // Assert
      expect(mockLogger.debug).toHaveBeenCalled();
    });

    it("should maintain logger state across operations", () => {
      // Arrange
      const handler1 = jest.fn().mockReturnValue({
        statusCode: 200,
        body: { data: "test1" },
      });
      const handler2 = jest.fn().mockReturnValue({
        statusCode: 200,
        body: { data: "test2" },
      });

      // Act
      server.get("/test1", handler1);
      server.post("/test2", handler2);

      // Assert
      expect(mockLogger.debug).toHaveBeenCalledTimes(2);
    });
  });

  describe("Handler Adaptation", () => {
    it("should register handler and call adaptHandler internally", () => {
      // Arrange
      const mockHandler = jest.fn().mockReturnValue({
        statusCode: 200,
        body: { data: "success" },
        headers: { "X-Custom": "value" },
      });

      // Act
      server.get("/test", mockHandler);

      // Assert
      expect(mockLogger.debug).toHaveBeenCalledWith("Route registered", {
        operation: "route-registration",
        metadata: {
          method: "GET",
          path: "/test",
          framework: "fastify",
        },
      });
    });

    it("should handle async handlers in registration", () => {
      // Arrange
      const mockAsyncHandler = jest.fn().mockImplementation(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
        return {
          statusCode: 200,
          body: { async: true },
        };
      });

      // Act
      server.post("/async", mockAsyncHandler);

      // Assert
      expect(mockLogger.debug).toHaveBeenCalledWith("Route registered", {
        operation: "route-registration",
        metadata: {
          method: "POST",
          path: "/async",
          framework: "fastify",
        },
      });
    });

    it("should register handlers for all HTTP methods", () => {
      // Arrange
      const getHandler = jest
        .fn()
        .mockReturnValue({ statusCode: 200, body: {} });
      const postHandler = jest
        .fn()
        .mockReturnValue({ statusCode: 201, body: {} });
      const putHandler = jest
        .fn()
        .mockReturnValue({ statusCode: 200, body: {} });
      const deleteHandler = jest
        .fn()
        .mockReturnValue({ statusCode: 204, body: undefined });

      // Act
      server.get("/get", getHandler);
      server.post("/post", postHandler);
      server.put("/put", putHandler);
      server.delete("/delete", deleteHandler);

      // Assert
      expect(mockLogger.debug).toHaveBeenCalledTimes(4);
      expect(mockLogger.debug).toHaveBeenNthCalledWith(1, "Route registered", {
        operation: "route-registration",
        metadata: { method: "GET", path: "/get", framework: "fastify" },
      });
      expect(mockLogger.debug).toHaveBeenNthCalledWith(2, "Route registered", {
        operation: "route-registration",
        metadata: { method: "POST", path: "/post", framework: "fastify" },
      });
      expect(mockLogger.debug).toHaveBeenNthCalledWith(3, "Route registered", {
        operation: "route-registration",
        metadata: { method: "PUT", path: "/put", framework: "fastify" },
      });
      expect(mockLogger.debug).toHaveBeenNthCalledWith(4, "Route registered", {
        operation: "route-registration",
        metadata: { method: "DELETE", path: "/delete", framework: "fastify" },
      });
    });
  });

  describe("Constructor and Setup", () => {
    it("should create server with disabled internal logger", () => {
      // Arrange & Act
      const testServer = new FastifyHttpServer(mockLogger);

      // Assert
      expect(testServer).toBeInstanceOf(FastifyHttpServer);
      // The server should be created with logger: false in fastify options
    });

    it("should setup global hooks during construction", () => {
      // Arrange & Act - hooks são configurados no constructor
      expect(mockFastifyInstance.addHook).toHaveBeenCalledWith(
        "onRequest",
        expect.any(Function),
      );
      expect(mockFastifyInstance.setErrorHandler).toHaveBeenCalledWith(
        expect.any(Function),
      );
    });

    it("should configure onRequest hook properly", () => {
      // Arrange
      const onRequestHook = mockFastifyInstance.addHook.mock.calls.find(
        (call) => call[0] === "onRequest",
      )?.[1];

      const mockRequest = {
        method: "GET",
        url: "/test",
        headers: { "user-agent": "test-agent" },
        ip: "127.0.0.1",
      };
      const mockReply = {};
      const mockDone = jest.fn();

      // Act
      onRequestHook?.(mockRequest, mockReply, mockDone);

      // Assert
      expect(mockLogger.debug).toHaveBeenCalledWith("HTTP Request received", {
        operation: "http-request-start",
        metadata: {
          method: "GET",
          url: "/test",
          userAgent: "test-agent",
          ip: "127.0.0.1",
        },
      });
      expect(mockDone).toHaveBeenCalled();
    });

    it("should configure error handler properly", () => {
      // Arrange
      const errorHandler =
        mockFastifyInstance.setErrorHandler.mock.calls[0]?.[0];
      const mockError = new Error("Test error");
      const mockRequest = {
        method: "POST",
        url: "/error-endpoint",
      };
      const mockReply = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      // Act
      errorHandler?.(mockError, mockRequest, mockReply);

      // Assert
      expect(mockLogger.error).toHaveBeenCalledWith(
        "Fastify internal error",
        mockError,
        {
          operation: "fastify-error",
          metadata: {
            method: "POST",
            url: "/error-endpoint",
          },
        },
      );
      expect(mockReply.status).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({
        error: "Erro interno do servidor",
      });
    });
  });

  describe("Handler Adaptation", () => {
    it("should adapt handler with successful response and headers", async () => {
      // Arrange
      const mockHandler = jest.fn().mockReturnValue({
        statusCode: 200,
        body: { data: "success" },
        headers: { "X-Custom": "value" },
      });

      server.get("/test", mockHandler);

      // Get the adapted handler from the mock call
      const adaptedHandler = mockFastifyInstance.get.mock.calls[0]?.[1];
      const mockRequest = {
        method: "GET",
        url: "/test",
        params: { id: "123" },
        query: { filter: "active" },
        body: { name: "test" },
        headers: { "user-agent": "test-agent" },
      };
      const mockReply = {
        header: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      // Act
      await adaptedHandler(mockRequest, mockReply);

      // Assert
      expect(mockHandler).toHaveBeenCalledWith({
        params: { id: "123" },
        query: { filter: "active" },
        body: { name: "test" },
        headers: { "user-agent": "test-agent" },
      });
      expect(mockReply.header).toHaveBeenCalledWith("X-Custom", "value");
      expect(mockReply.status).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith({ data: "success" });
      expect(mockLogger.info).toHaveBeenCalledWith(
        "HTTP Request processed",
        expect.objectContaining({
          operation: "http-request",
          metadata: expect.objectContaining({
            method: "GET",
            url: "/test",
            statusCode: 200,
            duration: expect.any(Number),
          }),
        }),
      );
    });

    it("should adapt handler with response without headers", async () => {
      // Arrange
      const mockHandler = jest.fn().mockReturnValue({
        statusCode: 201,
        body: { id: 1 },
        // No headers
      });

      server.post("/create", mockHandler);

      const adaptedHandler = mockFastifyInstance.post.mock.calls[0]?.[1];
      const mockRequest = {
        method: "POST",
        url: "/create",
        params: {},
        query: {},
        body: { name: "new item" },
        headers: {},
      };
      const mockReply = {
        header: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      // Act
      await adaptedHandler(mockRequest, mockReply);

      // Assert
      expect(mockReply.header).not.toHaveBeenCalled();
      expect(mockReply.status).toHaveBeenCalledWith(201);
      expect(mockReply.send).toHaveBeenCalledWith({ id: 1 });
    });

    it("should handle async handlers", async () => {
      // Arrange
      const mockAsyncHandler = jest.fn().mockImplementation(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
        return {
          statusCode: 200,
          body: { async: true },
        };
      });

      server.put("/async", mockAsyncHandler);

      const adaptedHandler = mockFastifyInstance.put.mock.calls[0]?.[1];
      const mockRequest = {
        method: "PUT",
        url: "/async",
        params: {},
        query: {},
        body: {},
        headers: {},
      };
      const mockReply = {
        header: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      // Act
      await adaptedHandler(mockRequest, mockReply);

      // Assert
      expect(mockAsyncHandler).toHaveBeenCalled();
      expect(mockReply.status).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith({ async: true });
    });

    it("should handle handler errors gracefully", async () => {
      // Arrange
      const mockHandler = jest.fn().mockImplementation(() => {
        throw new Error("Handler error");
      });

      server.delete("/error", mockHandler);

      const adaptedHandler = mockFastifyInstance.delete.mock.calls[0]?.[1];
      const mockRequest = {
        method: "DELETE",
        url: "/error",
        params: {},
        query: {},
        body: {},
        headers: {},
      };
      const mockReply = {
        header: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      // Act
      await adaptedHandler(mockRequest, mockReply);

      // Assert
      expect(mockLogger.error).toHaveBeenCalledWith(
        "HTTP Request failed",
        expect.any(Error),
        expect.objectContaining({
          operation: "http-request",
          metadata: expect.objectContaining({
            method: "DELETE",
            url: "/error",
            duration: expect.any(Number),
          }),
        }),
      );
      expect(mockReply.status).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({
        error: "Erro interno do servidor",
      });
    });
  });

  describe("Error Handling", () => {
    it("should verify error handling setup", () => {
      // Verify that error handler was configured during construction
      expect(mockFastifyInstance.setErrorHandler).toHaveBeenCalledWith(
        expect.any(Function),
      );
    });
  });
});
