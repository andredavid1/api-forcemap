/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { HealthRouteGroup } from "@presentation/routes/health/health.route-group";
import { IRouteAdapter } from "@infrastructure/protocols/router";
import {
  healthCheckHandler,
  apiInfoHandler,
} from "@presentation/routes/health/health.handlers";

// Mock the handlers
jest.mock("@presentation/routes/health/health.handlers", () => ({
  healthCheckHandler: jest.fn(),
  apiInfoHandler: jest.fn(),
}));

describe("HealthRouteGroup", () => {
  let healthRouteGroup: HealthRouteGroup;
  let mockAdapter: IRouteAdapter;

  beforeEach(() => {
    jest.clearAllMocks();

    healthRouteGroup = new HealthRouteGroup();

    mockAdapter = {
      registerRoute: jest.fn(),
    } as any;
  });

  describe("constructor", () => {
    it("should create an instance successfully", () => {
      const instance = new HealthRouteGroup();

      expect(instance).toBeInstanceOf(HealthRouteGroup);
      expect(instance).toHaveProperty("defineRoutes");
      expect(instance).toHaveProperty("getPrefix");
    });
  });

  describe("defineRoutes", () => {
    it("should register health check route", () => {
      healthRouteGroup.defineRoutes(mockAdapter);

      expect(mockAdapter.registerRoute).toHaveBeenCalledWith(
        "GET",
        "/health",
        healthCheckHandler,
      );
    });

    it("should register API info route", () => {
      healthRouteGroup.defineRoutes(mockAdapter);

      expect(mockAdapter.registerRoute).toHaveBeenCalledWith(
        "GET",
        "/",
        apiInfoHandler,
      );
    });

    it("should register both routes", () => {
      healthRouteGroup.defineRoutes(mockAdapter);

      expect(mockAdapter.registerRoute).toHaveBeenCalledTimes(2);
    });

    it("should register routes in correct order", () => {
      healthRouteGroup.defineRoutes(mockAdapter);

      expect(mockAdapter.registerRoute).toHaveBeenNthCalledWith(
        1,
        "GET",
        "/health",
        healthCheckHandler,
      );
      expect(mockAdapter.registerRoute).toHaveBeenNthCalledWith(
        2,
        "GET",
        "/",
        apiInfoHandler,
      );
    });

    it("should not throw when defining routes", () => {
      expect(() => {
        healthRouteGroup.defineRoutes(mockAdapter);
      }).not.toThrow();
    });
  });

  describe("getPrefix", () => {
    it("should return root prefix", () => {
      const prefix = healthRouteGroup.getPrefix();

      expect(prefix).toBe("/");
    });

    it("should return consistent prefix on multiple calls", () => {
      const prefix1 = healthRouteGroup.getPrefix();
      const prefix2 = healthRouteGroup.getPrefix();

      expect(prefix1).toBe(prefix2);
      expect(prefix1).toBe("/");
    });
  });

  describe("Interface Implementation", () => {
    it("should implement IRouteGroup interface", () => {
      expect(typeof healthRouteGroup.defineRoutes).toBe("function");
      expect(typeof healthRouteGroup.getPrefix).toBe("function");
    });

    it("should have correct method signatures", () => {
      expect(healthRouteGroup.defineRoutes).toHaveLength(1);
      expect(healthRouteGroup.getPrefix).toHaveLength(0);
    });
  });

  describe("Integration", () => {
    it("should work with different adapter implementations", () => {
      const mockAdapter1 = {
        registerRoute: jest.fn(),
      } as any;
      const mockAdapter2 = {
        registerRoute: jest.fn(),
      } as any;

      healthRouteGroup.defineRoutes(mockAdapter1);
      healthRouteGroup.defineRoutes(mockAdapter2);

      expect(mockAdapter1.registerRoute).toHaveBeenCalledTimes(2);
      expect(mockAdapter2.registerRoute).toHaveBeenCalledTimes(2);
    });

    it("should maintain independence between instances", () => {
      const instance1 = new HealthRouteGroup();
      const instance2 = new HealthRouteGroup();

      expect(instance1.getPrefix()).toBe(instance2.getPrefix());
      expect(instance1).not.toBe(instance2);
    });
  });
});
