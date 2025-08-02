import { SilentLogger } from "@infrastructure/logging";

describe("SilentLogger", () => {
  let logger: SilentLogger;

  beforeEach(() => {
    logger = new SilentLogger();
  });

  afterEach(() => {
    logger.clearLogs();
  });

  describe("Basic logging functionality", () => {
    it("should log error messages", () => {
      const message = "Test error message";
      const error = new Error("Test error");
      const context = { userId: "123", operation: "test" };

      logger.error(message, error, context);

      const logs = logger.getLogs();
      expect(logs).toHaveLength(1);
      expect(logs[0].level).toBe("error");
      expect(logs[0].message).toBe(message);
      expect(logs[0].error).toBe(error);
      expect(logs[0].context).toEqual(context);
      expect(logs[0].timestamp).toBeInstanceOf(Date);
    });

    it("should log warn messages", () => {
      const message = "Test warning";
      const context = { requestId: "abc-123" };

      logger.warn(message, context);

      const logs = logger.getLogs();
      expect(logs).toHaveLength(1);
      expect(logs[0].level).toBe("warn");
      expect(logs[0].message).toBe(message);
      expect(logs[0].context).toEqual(context);
      expect(logs[0].error).toBeUndefined();
    });

    it("should log info messages", () => {
      const message = "Test info";

      logger.info(message);

      const logs = logger.getLogs();
      expect(logs).toHaveLength(1);
      expect(logs[0].level).toBe("info");
      expect(logs[0].message).toBe(message);
      expect(logs[0].context).toEqual({});
    });

    it("should log debug messages", () => {
      const message = "Test debug";
      const context = { entityId: "456" };

      logger.debug(message, context);

      const logs = logger.getLogs();
      expect(logs).toHaveLength(1);
      expect(logs[0].level).toBe("debug");
      expect(logs[0].message).toBe(message);
      expect(logs[0].context).toEqual(context);
    });
  });

  describe("Context functionality", () => {
    it("should create logger with base context", () => {
      const baseContext = { userId: "123", operation: "create" };
      const loggerWithContext = new SilentLogger(baseContext);

      loggerWithContext.info("Test message");

      const logs = loggerWithContext.getLogs();
      expect(logs[0].context).toEqual(baseContext);
    });

    it("should merge base context with method context", () => {
      const baseContext = { userId: "123" };
      const methodContext = { operation: "create", entityId: "456" };
      const loggerWithContext = new SilentLogger(baseContext);

      loggerWithContext.info("Test", methodContext);

      const logs = loggerWithContext.getLogs();
      expect(logs[0].context).toEqual({
        userId: "123",
        operation: "create",
        entityId: "456",
      });
    });

    it("should create new logger instance with additional context", () => {
      const originalContext = { userId: "123" };
      const additionalContext = { requestId: "abc-123" };

      const baseLogger = new SilentLogger(originalContext);
      const contextLogger = baseLogger.withContext(additionalContext);

      contextLogger.info("Test message");

      const logs = (contextLogger as SilentLogger).getLogs();
      expect(logs[0].context).toEqual({
        userId: "123",
        requestId: "abc-123",
      });
    });

    it("should override context values when keys conflict", () => {
      const baseContext = { userId: "123", operation: "read" };
      const overrideContext = { operation: "create" };

      const loggerWithContext = new SilentLogger(baseContext);

      loggerWithContext.info("Test", overrideContext);

      const logs = loggerWithContext.getLogs();
      expect(logs[0].context).toEqual({
        userId: "123",
        operation: "create",
      });
    });
  });

  describe("Utility methods", () => {
    beforeEach(() => {
      logger.error("Error message");
      logger.warn("Warning message");
      logger.info("Info message");
      logger.debug("Debug message");
    });

    it("should return all logs", () => {
      const logs = logger.getLogs();
      expect(logs).toHaveLength(4);
      expect(logs.map((log) => log.level)).toEqual([
        "error",
        "warn",
        "info",
        "debug",
      ]);
    });

    it("should return last log", () => {
      const lastLog = logger.getLastLog();
      expect(lastLog?.level).toBe("debug");
      expect(lastLog?.message).toBe("Debug message");
    });

    it("should return undefined when no logs exist", () => {
      logger.clearLogs();
      const lastLog = logger.getLastLog();
      expect(lastLog).toBeUndefined();
    });

    it("should filter logs by level", () => {
      const errorLogs = logger.getLogsByLevel("error");
      const warnLogs = logger.getLogsByLevel("warn");

      expect(errorLogs).toHaveLength(1);
      expect(errorLogs[0].message).toBe("Error message");

      expect(warnLogs).toHaveLength(1);
      expect(warnLogs[0].message).toBe("Warning message");
    });

    it("should clear all logs", () => {
      expect(logger.getLogs()).toHaveLength(4);

      logger.clearLogs();

      expect(logger.getLogs()).toHaveLength(0);
      expect(logger.getLastLog()).toBeUndefined();
    });

    it("should return copy of logs array", () => {
      const logs1 = logger.getLogs();
      const logs2 = logger.getLogs();

      expect(logs1).not.toBe(logs2); // Different references
      expect(logs1).toEqual(logs2); // Same content
    });
  });
});
