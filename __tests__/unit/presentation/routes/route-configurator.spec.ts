/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { RouteConfigurator } from "@presentation/routes/route-configurator";
import { IHttpServer } from "@infrastructure/protocols/http";
import { RouteAdapter } from "@infrastructure/router";
import { HealthRouteGroup, MilitaryRankRouteGroup } from "@presentation/routes";

// Mock RouteAdapter
jest.mock("@infrastructure/router", () => ({
  RouteAdapter: jest.fn().mockImplementation(() => ({
    registerGroup: jest.fn(),
    applyRoutes: jest.fn(),
  })),
}));

// Mock route groups
jest.mock("@presentation/routes", () => ({
  HealthRouteGroup: jest.fn(),
  MilitaryRankRouteGroup: jest.fn(),
}));

describe("RouteConfigurator", () => {
  let mockServer: IHttpServer;
  let mockRouteAdapter: any;
  let mockHealthRouteGroup: any;
  let mockMilitaryRankRouteGroup: any;

  beforeEach(() => {
    jest.clearAllMocks();

    mockServer = {
      listen: jest.fn(),
      close: jest.fn(),
      register: jest.fn(),
    } as any;

    mockRouteAdapter = {
      registerGroup: jest.fn(),
      applyRoutes: jest.fn(),
    };

    mockHealthRouteGroup = {};
    mockMilitaryRankRouteGroup = {};

    (RouteAdapter as jest.Mock).mockImplementation(() => mockRouteAdapter);
    (HealthRouteGroup as jest.Mock).mockImplementation(
      () => mockHealthRouteGroup,
    );
    (MilitaryRankRouteGroup as jest.Mock).mockImplementation(
      () => mockMilitaryRankRouteGroup,
    );
  });

  describe("configure", () => {
    it("should create a RouteAdapter instance", () => {
      RouteConfigurator.configure(mockServer);

      expect(RouteAdapter).toHaveBeenCalledTimes(1);
      expect(RouteAdapter).toHaveBeenCalledWith();
    });

    it("should create route group instances", () => {
      RouteConfigurator.configure(mockServer);

      expect(HealthRouteGroup).toHaveBeenCalledTimes(1);
      expect(MilitaryRankRouteGroup).toHaveBeenCalledTimes(1);
    });

    it("should register health routes at root path", () => {
      RouteConfigurator.configure(mockServer);

      expect(mockRouteAdapter.registerGroup).toHaveBeenCalledWith(
        "/",
        mockHealthRouteGroup,
      );
    });

    it("should register military rank routes at API v1 path", () => {
      RouteConfigurator.configure(mockServer);

      expect(mockRouteAdapter.registerGroup).toHaveBeenCalledWith(
        "/api/v1/military-ranks",
        mockMilitaryRankRouteGroup,
      );
    });

    it("should register routes in correct order", () => {
      RouteConfigurator.configure(mockServer);

      expect(mockRouteAdapter.registerGroup).toHaveBeenNthCalledWith(
        1,
        "/",
        mockHealthRouteGroup,
      );
      expect(mockRouteAdapter.registerGroup).toHaveBeenNthCalledWith(
        2,
        "/api/v1/military-ranks",
        mockMilitaryRankRouteGroup,
      );
    });

    it("should apply all routes to the server", () => {
      RouteConfigurator.configure(mockServer);

      expect(mockRouteAdapter.applyRoutes).toHaveBeenCalledTimes(1);
      expect(mockRouteAdapter.applyRoutes).toHaveBeenCalledWith(mockServer);
    });

    it("should complete configuration without errors", () => {
      expect(() => {
        RouteConfigurator.configure(mockServer);
      }).not.toThrow();
    });

    it("should call all methods in expected sequence", () => {
      RouteConfigurator.configure(mockServer);

      expect(RouteAdapter).toHaveBeenCalled();
      expect(HealthRouteGroup).toHaveBeenCalled();
      expect(MilitaryRankRouteGroup).toHaveBeenCalled();
      expect(mockRouteAdapter.registerGroup).toHaveBeenCalledTimes(2);
      expect(mockRouteAdapter.applyRoutes).toHaveBeenCalledTimes(1);
    });
  });

  describe("Static Class Behavior", () => {
    it("should have configure as a static method", () => {
      expect(typeof RouteConfigurator.configure).toBe("function");
    });
  });
});
