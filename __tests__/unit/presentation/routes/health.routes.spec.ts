/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { healthCheckHandler, apiInfoHandler } from "@presentation/routes";
import { IHttpRequest, IHttpResponse } from "@infrastructure/protocols/http";

interface HealthData {
  status: string;
  timestamp: string;
  version: string;
  uptime: number;
}

interface ApiInfoData {
  name: string;
  version: string;
  description: string;
  architecture: string;
  features: string[];
}

describe("Health Routes", () => {
  describe("healthCheckHandler", () => {
    it("should return health check response with correct structure", () => {
      // Arrange
      const mockRequest: IHttpRequest = {};

      // Act
      const response = healthCheckHandler(
        mockRequest,
      ) as IHttpResponse<HealthData>;

      // Assert
      expect(response.statusCode).toBe(200);
      expect(response.body?.data).toEqual(
        expect.objectContaining({
          status: "healthy",
          timestamp: expect.any(String),
          version: "1.0.0",
          uptime: expect.any(Number),
        }),
      );
    });

    it("should return valid ISO timestamp", () => {
      // Arrange
      const mockRequest: IHttpRequest = {};

      // Act
      const response = healthCheckHandler(
        mockRequest,
      ) as IHttpResponse<HealthData>;

      // Assert
      const timestamp = response.body?.data?.timestamp as string;
      expect(timestamp).toBeDefined();
      expect(() => new Date(timestamp)).not.toThrow();
      expect(new Date(timestamp).toISOString()).toBe(timestamp);
    });

    it("should return current uptime", () => {
      // Arrange
      const mockRequest: IHttpRequest = {};
      const uptimeBefore = process.uptime();

      // Act
      const response = healthCheckHandler(
        mockRequest,
      ) as IHttpResponse<HealthData>;

      // Assert
      const responseUptime = response.body?.data?.uptime as number;
      expect(responseUptime).toBeGreaterThanOrEqual(uptimeBefore);
      expect(typeof responseUptime).toBe("number");
    });
  });

  describe("apiInfoHandler", () => {
    it("should return API information with correct structure", () => {
      // Arrange
      const mockRequest: IHttpRequest = {};

      // Act
      const response = apiInfoHandler(
        mockRequest,
      ) as IHttpResponse<ApiInfoData>;

      // Assert
      expect(response.statusCode).toBe(200);
      expect(response.body?.data).toEqual({
        name: "API Forcemap",
        version: "1.0.0",
        description: "Clean Architecture Implementation",
        architecture: "Domain -> Application -> Infrastructure -> Presentation",
        features: [
          "SOLID Principles",
          "Dependency Inversion",
          "Clean Architecture",
          "Type Safety",
          "Comprehensive Testing",
        ],
      });
    });

    it("should include all expected features", () => {
      // Arrange
      const mockRequest: IHttpRequest = {};

      // Act
      const response = apiInfoHandler(
        mockRequest,
      ) as IHttpResponse<ApiInfoData>;

      // Assert
      const features = response.body?.data?.features as string[];
      expect(features).toContain("SOLID Principles");
      expect(features).toContain("Dependency Inversion");
      expect(features).toContain("Clean Architecture");
      expect(features).toContain("Type Safety");
      expect(features).toContain("Comprehensive Testing");
      expect(features).toHaveLength(5);
    });

    it("should return consistent API information", () => {
      // Arrange
      const mockRequest: IHttpRequest = {};

      // Act
      const response1 = apiInfoHandler(
        mockRequest,
      ) as IHttpResponse<ApiInfoData>;
      const response2 = apiInfoHandler(
        mockRequest,
      ) as IHttpResponse<ApiInfoData>;

      // Assert
      expect(response1.body?.data).toEqual(response2.body?.data);
      expect(response1.statusCode).toBe(response2.statusCode);
    });
  });

  describe("Route Handler Types", () => {
    it("should accept IHttpRequest and return IHttpResponse", () => {
      // Arrange
      const mockRequest: IHttpRequest = {
        params: { id: "123" },
        query: { filter: "active" },
        body: { test: "data" },
        headers: { "content-type": "application/json" },
      };

      // Act
      const healthResponse = healthCheckHandler(mockRequest) as IHttpResponse;
      const infoResponse = apiInfoHandler(mockRequest) as IHttpResponse;

      // Assert
      expect(healthResponse).toHaveProperty("statusCode");
      expect(healthResponse).toHaveProperty("body");
      expect(infoResponse).toHaveProperty("statusCode");
      expect(infoResponse).toHaveProperty("body");
    });

    it("should work with empty request", () => {
      // Arrange
      const emptyRequest: IHttpRequest = {};

      // Act & Assert
      expect(() => healthCheckHandler(emptyRequest)).not.toThrow();
      expect(() => apiInfoHandler(emptyRequest)).not.toThrow();
    });
  });
});
