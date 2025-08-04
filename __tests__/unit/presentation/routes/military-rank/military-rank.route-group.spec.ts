/* eslint-disable @typescript-eslint/unbound-method */
import { MilitaryRankRouteGroup } from "@presentation/routes/military-rank/military-rank.route-group";
import { IRouteAdapter } from "@infrastructure/protocols/router";
import {
  createMilitaryRankHandler,
  listMilitaryRanksHandler,
  getMilitaryRankByIdHandler,
  updateMilitaryRankHandler,
  deleteMilitaryRankHandler,
} from "@presentation/routes/military-rank/military-rank.handlers";

// Mock dos handlers
jest.mock("@presentation/routes/military-rank/military-rank.handlers", () => ({
  createMilitaryRankHandler: jest.fn(),
  listMilitaryRanksHandler: jest.fn(),
  getMilitaryRankByIdHandler: jest.fn(),
  updateMilitaryRankHandler: jest.fn(),
  deleteMilitaryRankHandler: jest.fn(),
}));

describe("MilitaryRankRouteGroup", () => {
  let militaryRankRouteGroup: MilitaryRankRouteGroup;
  let mockAdapter: jest.Mocked<IRouteAdapter>;

  beforeEach(() => {
    militaryRankRouteGroup = new MilitaryRankRouteGroup();
    mockAdapter = {
      registerRoute: jest.fn(),
      registerGroup: jest.fn(),
      applyRoutes: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("defineRoutes", () => {
    it("should register POST route for creating military rank", () => {
      // Act
      militaryRankRouteGroup.defineRoutes(mockAdapter);

      // Assert
      expect(mockAdapter.registerRoute).toHaveBeenCalledWith(
        "POST",
        "/",
        createMilitaryRankHandler,
      );
    });

    it("should register GET route for listing military ranks", () => {
      // Act
      militaryRankRouteGroup.defineRoutes(mockAdapter);

      // Assert
      expect(mockAdapter.registerRoute).toHaveBeenCalledWith(
        "GET",
        "/",
        listMilitaryRanksHandler,
      );
    });

    it("should register GET route for getting military rank by ID", () => {
      // Act
      militaryRankRouteGroup.defineRoutes(mockAdapter);

      // Assert
      expect(mockAdapter.registerRoute).toHaveBeenCalledWith(
        "GET",
        "/:id",
        getMilitaryRankByIdHandler,
      );
    });

    it("should register PUT route for updating military rank", () => {
      // Act
      militaryRankRouteGroup.defineRoutes(mockAdapter);

      // Assert
      expect(mockAdapter.registerRoute).toHaveBeenCalledWith(
        "PUT",
        "/:id",
        updateMilitaryRankHandler,
      );
    });

    it("should register DELETE route for deleting military rank", () => {
      // Act
      militaryRankRouteGroup.defineRoutes(mockAdapter);

      // Assert
      expect(mockAdapter.registerRoute).toHaveBeenCalledWith(
        "DELETE",
        "/:id",
        deleteMilitaryRankHandler,
      );
    });

    it("should register all 5 routes when defineRoutes is called", () => {
      // Act
      militaryRankRouteGroup.defineRoutes(mockAdapter);

      // Assert
      expect(mockAdapter.registerRoute).toHaveBeenCalledTimes(5);
    });

    it("should register routes in the correct order", () => {
      // Act
      militaryRankRouteGroup.defineRoutes(mockAdapter);

      // Assert
      const calls = mockAdapter.registerRoute.mock.calls;
      expect(calls[0]).toEqual(["POST", "/", createMilitaryRankHandler]);
      expect(calls[1]).toEqual(["GET", "/", listMilitaryRanksHandler]);
      expect(calls[2]).toEqual(["GET", "/:id", getMilitaryRankByIdHandler]);
      expect(calls[3]).toEqual(["PUT", "/:id", updateMilitaryRankHandler]);
      expect(calls[4]).toEqual(["DELETE", "/:id", deleteMilitaryRankHandler]);
    });

    it("should not throw when adapter is valid", () => {
      // Assert
      expect(() =>
        militaryRankRouteGroup.defineRoutes(mockAdapter),
      ).not.toThrow();
    });

    it("should use correct HTTP methods for each endpoint", () => {
      // Act
      militaryRankRouteGroup.defineRoutes(mockAdapter);

      // Assert
      const httpMethods = mockAdapter.registerRoute.mock.calls.map(
        (call) => call[0],
      );
      expect(httpMethods).toEqual(["POST", "GET", "GET", "PUT", "DELETE"]);
    });

    it("should use correct paths for each endpoint", () => {
      // Act
      militaryRankRouteGroup.defineRoutes(mockAdapter);

      // Assert
      const paths = mockAdapter.registerRoute.mock.calls.map((call) => call[1]);
      expect(paths).toEqual(["/", "/", "/:id", "/:id", "/:id"]);
    });

    it("should register handlers correctly for all endpoints", () => {
      // Act
      militaryRankRouteGroup.defineRoutes(mockAdapter);

      // Assert
      const handlers = mockAdapter.registerRoute.mock.calls.map(
        (call) => call[2],
      );
      expect(handlers).toEqual([
        createMilitaryRankHandler,
        listMilitaryRanksHandler,
        getMilitaryRankByIdHandler,
        updateMilitaryRankHandler,
        deleteMilitaryRankHandler,
      ]);
    });

    it("should call adapter.registerRoute with exact parameters for create endpoint", () => {
      // Act
      militaryRankRouteGroup.defineRoutes(mockAdapter);

      // Assert
      expect(mockAdapter.registerRoute).toHaveBeenNthCalledWith(
        1,
        "POST",
        "/",
        createMilitaryRankHandler,
      );
    });
  });

  describe("getPrefix", () => {
    it("should return correct prefix for military ranks", () => {
      // Act
      const prefix = militaryRankRouteGroup.getPrefix();

      // Assert
      expect(prefix).toBe("/military-ranks");
    });

    it("should return consistent prefix across multiple calls", () => {
      // Act
      const prefix1 = militaryRankRouteGroup.getPrefix();
      const prefix2 = militaryRankRouteGroup.getPrefix();

      // Assert
      expect(prefix1).toBe(prefix2);
      expect(prefix1).toBe("/military-ranks");
    });
  });

  describe("class instantiation", () => {
    it("should create instance successfully", () => {
      // Assert
      expect(militaryRankRouteGroup).toBeInstanceOf(MilitaryRankRouteGroup);
    });

    it("should implement IRouteGroup interface", () => {
      // Assert
      expect(militaryRankRouteGroup.defineRoutes).toBeDefined();
      expect(typeof militaryRankRouteGroup.defineRoutes).toBe("function");
    });
  });
});
