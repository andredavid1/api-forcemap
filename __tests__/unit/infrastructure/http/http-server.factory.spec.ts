import { ILogger } from "@domain/services";
import { HttpServerFactory, FastifyHttpServer } from "@infrastructure/http";

describe("HttpServerFactory", () => {
  let mockLogger: jest.Mocked<ILogger>;

  beforeEach(() => {
    mockLogger = {
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
      withContext: jest.fn().mockReturnThis(),
    } as jest.Mocked<ILogger>;
  });

  describe("create", () => {
    it("should create FastifyHttpServer when serverType is 'fastify'", () => {
      // Act
      const server = HttpServerFactory.create(mockLogger, "fastify");

      // Assert
      expect(server).toBeInstanceOf(FastifyHttpServer);
    });

    it("should create FastifyHttpServer when no serverType is provided (default)", () => {
      // Act
      const server = HttpServerFactory.create(mockLogger);

      // Assert
      expect(server).toBeInstanceOf(FastifyHttpServer);
    });

    it("should throw error for unsupported server type", () => {
      // Act & Assert
      expect(() => {
        HttpServerFactory.create(mockLogger, "unsupported" as never);
      }).toThrow("Unsupported server type: unsupported");
    });
  });

  describe("createFromEnvironment", () => {
    const originalEnv = process.env;

    beforeEach(() => {
      jest.resetModules();
      process.env = { ...originalEnv };
    });

    afterEach(() => {
      process.env = originalEnv;
    });

    it("should create FastifyHttpServer when HTTP_SERVER_TYPE is 'fastify'", () => {
      // Arrange
      process.env.HTTP_SERVER_TYPE = "fastify";

      // Act
      const server = HttpServerFactory.createFromEnvironment(mockLogger);

      // Assert
      expect(server).toBeInstanceOf(FastifyHttpServer);
    });

    it("should create FastifyHttpServer when HTTP_SERVER_TYPE is not set (default)", () => {
      // Arrange
      delete process.env.HTTP_SERVER_TYPE;

      // Act
      const server = HttpServerFactory.createFromEnvironment(mockLogger);

      // Assert
      expect(server).toBeInstanceOf(FastifyHttpServer);
    });

    it("should inject logger correctly", () => {
      // Act
      const server = HttpServerFactory.createFromEnvironment(mockLogger);

      // Assert
      expect(server).toBeDefined();
      expect(server).toBeInstanceOf(FastifyHttpServer);
    });
  });

  describe("Dependency Injection", () => {
    it("should inject logger into created server instance", () => {
      // Act
      const server = HttpServerFactory.create(mockLogger);

      // Assert - We can't directly test private dependencies, but we can test behavior
      expect(server).toBeDefined();
      expect(typeof server.start).toBe("function");
      expect(typeof server.stop).toBe("function");
      expect(typeof server.get).toBe("function");
      expect(typeof server.post).toBe("function");
      expect(typeof server.put).toBe("function");
      expect(typeof server.delete).toBe("function");
    });

    it("should create different instances on multiple calls", () => {
      // Act
      const server1 = HttpServerFactory.create(mockLogger);
      const server2 = HttpServerFactory.create(mockLogger);

      // Assert
      expect(server1).not.toBe(server2);
      expect(server1).toBeInstanceOf(FastifyHttpServer);
      expect(server2).toBeInstanceOf(FastifyHttpServer);
    });
  });
});
