/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  healthCheckHandler,
  apiInfoHandler,
} from "@presentation/routes/health.routes";
import { IHttpRequest } from "@infrastructure/protocols/http";

describe("Health Routes (Legacy)", () => {
  describe("healthCheckHandler", () => {
    it("should return health status with 200 status code", () => {
      const mockRequest: IHttpRequest = {};
      const response = healthCheckHandler(mockRequest) as any;

      expect(response.statusCode).toBe(200);
      expect(response.body.data).toEqual(
        expect.objectContaining({
          status: "healthy",
          version: "1.0.0",
          timestamp: expect.any(String),
          uptime: expect.any(Number),
        }),
      );
    });

    it("should return valid timestamp", () => {
      const mockRequest: IHttpRequest = {};
      const response = healthCheckHandler(mockRequest) as any;

      const timestamp = response.body.data.timestamp;
      expect(timestamp).toBeDefined();
      expect(() => new Date(timestamp as string)).not.toThrow();
    });

    it("should return process uptime", () => {
      const mockRequest: IHttpRequest = {};
      const response = healthCheckHandler(mockRequest) as any;

      const uptime = response.body.data.uptime;
      expect(uptime).toBeDefined();
      expect(typeof uptime).toBe("number");
      expect(uptime).toBeGreaterThanOrEqual(0);
    });
  });

  describe("apiInfoHandler", () => {
    it("should return API information with 200 status code", () => {
      const mockRequest: IHttpRequest = {};
      const response = apiInfoHandler(mockRequest) as any;

      expect(response.statusCode).toBe(200);
      expect(response.body.data).toEqual(
        expect.objectContaining({
          name: "API Forcemap",
          version: "1.0.0",
          description: "Clean Architecture Implementation",
          architecture:
            "Domain -> Application -> Infrastructure -> Presentation",
          features: expect.arrayContaining([
            "SOLID Principles",
            "Dependency Inversion",
            "Clean Architecture",
            "Type Safety",
            "Comprehensive Testing",
          ]),
        }),
      );
    });

    it("should return all expected features", () => {
      const mockRequest: IHttpRequest = {};
      const response = apiInfoHandler(mockRequest) as any;

      const features = response.body.data.features;
      expect(features).toHaveLength(5);
      expect(features).toContain("SOLID Principles");
      expect(features).toContain("Dependency Inversion");
      expect(features).toContain("Clean Architecture");
      expect(features).toContain("Type Safety");
      expect(features).toContain("Comprehensive Testing");
    });
  });

  describe("Handler Integration", () => {
    it("should handle both handlers without throwing", () => {
      const mockRequest: IHttpRequest = {
        params: { test: "value" },
        query: { filter: "active" },
        body: { data: "test" },
        headers: { "content-type": "application/json" },
      };

      expect(() => healthCheckHandler(mockRequest)).not.toThrow();
      expect(() => apiInfoHandler(mockRequest)).not.toThrow();
    });

    it("should return consistent response structure", () => {
      const mockRequest: IHttpRequest = {};

      const healthResponse = healthCheckHandler(mockRequest) as any;
      const infoResponse = apiInfoHandler(mockRequest) as any;

      expect(healthResponse).toHaveProperty("statusCode");
      expect(healthResponse).toHaveProperty("body");
      expect(healthResponse.body).toHaveProperty("data");

      expect(infoResponse).toHaveProperty("statusCode");
      expect(infoResponse).toHaveProperty("body");
      expect(infoResponse.body).toHaveProperty("data");
    });
  });
});
