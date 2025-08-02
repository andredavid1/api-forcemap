import { LoggerFactory } from "@infrastructure/logging";
import { ConsoleLogger } from "@infrastructure/logging/console.logger";
import { SilentLogger } from "@infrastructure/logging/silent.logger";

describe("LoggerFactory", () => {
  describe("create method", () => {
    it("should create ConsoleLogger when type is console", () => {
      const logger = LoggerFactory.create({ type: "console" });

      expect(logger).toBeInstanceOf(ConsoleLogger);
    });

    it("should create SilentLogger when type is silent", () => {
      const logger = LoggerFactory.create({ type: "silent" });

      expect(logger).toBeInstanceOf(SilentLogger);
    });

    it("should create ConsoleLogger as default for unknown types", () => {
      // Teste para tipo inexistente - deve usar o default (ConsoleLogger)
      const unknownConfig = { type: "unknown" } as {
        type: "console" | "silent" | "unknown";
      };
      const logger = LoggerFactory.create(
        unknownConfig as { type: "console" | "silent" },
      );

      expect(logger).toBeInstanceOf(ConsoleLogger);
    });
  });

  describe("createFromEnvironment method", () => {
    const originalEnv = process.env.NODE_ENV;

    afterEach(() => {
      process.env.NODE_ENV = originalEnv;
    });

    it("should create SilentLogger when NODE_ENV is test", () => {
      process.env.NODE_ENV = "test";

      const logger = LoggerFactory.createFromEnvironment();

      expect(logger).toBeInstanceOf(SilentLogger);
    });

    it("should create ConsoleLogger when NODE_ENV is development", () => {
      process.env.NODE_ENV = "development";

      const logger = LoggerFactory.createFromEnvironment();

      expect(logger).toBeInstanceOf(ConsoleLogger);
    });

    it("should create ConsoleLogger when NODE_ENV is production", () => {
      process.env.NODE_ENV = "production";

      const logger = LoggerFactory.createFromEnvironment();

      expect(logger).toBeInstanceOf(ConsoleLogger);
    });

    it("should create ConsoleLogger when NODE_ENV is undefined", () => {
      delete process.env.NODE_ENV;

      const logger = LoggerFactory.createFromEnvironment();

      expect(logger).toBeInstanceOf(ConsoleLogger);
    });
  });
});
