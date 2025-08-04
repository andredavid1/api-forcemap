/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ILogger } from "@domain/services";
import { FastifyHttpServer } from "@infrastructure/http";

describe("FastifyHttpServer", () => {
  let mockLogger: jest.Mocked<ILogger>;
  let server: FastifyHttpServer;

  beforeEach(() => {
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
      const port = 0; // Use random available port
      const host = "127.0.0.1";

      // Act
      await server.start(port, host);

      // Assert
      expect(mockLogger.info).toHaveBeenCalledWith(
        "HTTP Server started successfully",
        expect.objectContaining({
          operation: "server-startup",
          metadata: expect.objectContaining({
            framework: "fastify",
            port: expect.any(Number),
            host,
            environment: expect.any(String),
          }),
        }),
      );
    });

    it("should stop server gracefully", async () => {
      // Arrange
      await server.start(0, "127.0.0.1");

      // Act
      await server.stop();

      // Assert
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
      const port = -1; // Invalid port

      // Act & Assert
      await expect(server.start(port)).rejects.toThrow();
      expect(mockLogger.error).toHaveBeenCalledWith(
        "Failed to start HTTP server",
        expect.objectContaining({
          message: expect.stringContaining("options.port should be"),
        }),
        {
          operation: "server-startup",
          metadata: {
            framework: "fastify",
            host: "0.0.0.0",
            port: -1,
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
});
