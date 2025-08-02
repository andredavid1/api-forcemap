import { ConsoleLogger } from "@infrastructure/logging";

// Mock console methods
const mockConsoleError = jest.spyOn(console, "error").mockImplementation();
const mockConsoleWarn = jest.spyOn(console, "warn").mockImplementation();
const mockConsoleInfo = jest.spyOn(console, "info").mockImplementation();
const mockConsoleDebug = jest.spyOn(console, "debug").mockImplementation();

describe("ConsoleLogger", () => {
  let logger: ConsoleLogger;

  beforeEach(() => {
    logger = new ConsoleLogger();
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe("Basic logging functionality", () => {
    it("should call console.error for error logs", () => {
      const message = "Test error";
      const error = new Error("Test error details");
      const context = { userId: "123" };

      logger.error(message, error, context);

      expect(mockConsoleError).toHaveBeenCalledTimes(1);
      expect(mockConsoleError).toHaveBeenCalledWith(expect.any(String));

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const logOutput = JSON.parse(mockConsoleError.mock.calls[0][0] as string);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(logOutput.level).toBe("error");
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(logOutput.message).toBe(message);
    });

    it("should call console.warn for warn logs", () => {
      const message = "Test warning";
      const context = { operation: "test" };

      logger.warn(message, context);

      expect(mockConsoleWarn).toHaveBeenCalledTimes(1);
      expect(mockConsoleWarn).toHaveBeenCalledWith(expect.any(String));
    });

    it("should call console.info for info logs", () => {
      const message = "Test info";

      logger.info(message);

      expect(mockConsoleInfo).toHaveBeenCalledTimes(1);
      expect(mockConsoleInfo).toHaveBeenCalledWith(expect.any(String));
    });

    it("should call console.debug for debug logs", () => {
      const message = "Test debug";
      const context = { requestId: "abc-123" };

      logger.debug(message, context);

      expect(mockConsoleDebug).toHaveBeenCalledTimes(1);
      expect(mockConsoleDebug).toHaveBeenCalledWith(expect.any(String));
    });
  });

  describe("Context functionality", () => {
    it("should create logger with base context", () => {
      const baseContext = { userId: "123", service: "military-rank" };
      const contextLogger = new ConsoleLogger(baseContext);

      contextLogger.info("Test message");

      expect(mockConsoleInfo).toHaveBeenCalledTimes(1);
      expect(mockConsoleInfo).toHaveBeenCalledWith(
        expect.stringContaining("123"),
      );
      expect(mockConsoleInfo).toHaveBeenCalledWith(
        expect.stringContaining("military-rank"),
      );
    });

    it("should create new logger instance with additional context", () => {
      const originalContext = { userId: "123" };
      const additionalContext = { requestId: "abc-123" };

      const baseLogger = new ConsoleLogger(originalContext);
      const newLogger = baseLogger.withContext(additionalContext);

      newLogger.info("Test message");

      expect(mockConsoleInfo).toHaveBeenCalledTimes(1);
      expect(mockConsoleInfo).toHaveBeenCalledWith(
        expect.stringContaining("123"),
      );
      expect(mockConsoleInfo).toHaveBeenCalledWith(
        expect.stringContaining("abc-123"),
      );
    });
  });

  describe("Log formatting", () => {
    it("should format log as valid JSON", () => {
      logger.info("Test message", { userId: "123" });

      const logString = mockConsoleInfo.mock.calls[0][0] as string;
      expect(() => {
        JSON.parse(logString);
      }).not.toThrow();
    });

    it("should include timestamp", () => {
      logger.info("Test message");

      expect(mockConsoleInfo).toHaveBeenCalledWith(
        expect.stringContaining("timestamp"),
      );
    });

    it("should include error information when error is provided", () => {
      const error = new Error("Test error");

      logger.error("Test message", error);

      expect(mockConsoleError).toHaveBeenCalledWith(
        expect.stringContaining("Test error"),
      );
    });
  });
});
