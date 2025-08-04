/**
 * RouteAdapter Unit Tests
 *
 * @description
 * Testes unitários para o RouteAdapter e GroupRouteAdapter.
 * Garante cobertura completa de todos os métodos e casos de uso.
 */

/* eslint-disable @typescript-eslint/unbound-method */

import { RouteAdapter } from "@infrastructure/router/route.adapter";
import {
  IRouteAdapter,
  IRouteGroup,
  HttpMethod,
} from "@infrastructure/protocols/router";
import { IHttpServer, IRouteHandler } from "@infrastructure/protocols/http";

// Mock do servidor HTTP
const createMockServer = (): jest.Mocked<IHttpServer> => ({
  start: jest.fn(),
  stop: jest.fn(),
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
});

// Mock de handler simples
const mockHandler: IRouteHandler = jest.fn();

// Mock de um RouteGroup para testes
class MockRouteGroup implements IRouteGroup {
  constructor(
    private routes: Array<{
      method: HttpMethod;
      path: string;
      handler: IRouteHandler;
    }> = [],
  ) {}

  public defineRoutes(adapter: IRouteAdapter): void {
    this.routes.forEach((route) => {
      adapter.registerRoute(route.method, route.path, route.handler);
    });
  }

  public getPrefix(): string {
    return "/test";
  }
}

describe("RouteAdapter", () => {
  let routeAdapter: RouteAdapter;
  let mockServer: jest.Mocked<IHttpServer>;

  beforeEach(() => {
    routeAdapter = new RouteAdapter();
    mockServer = createMockServer();
    jest.clearAllMocks();
  });

  describe("registerRoute", () => {
    it("should register a single GET route", () => {
      routeAdapter.registerRoute("GET", "/test", mockHandler);

      const routes = routeAdapter.getRoutes();
      expect(routes).toHaveLength(1);
      expect(routes[0]).toEqual({
        method: "GET",
        path: "/test",
        handler: mockHandler,
      });
    });

    it("should register multiple routes with different methods", () => {
      routeAdapter.registerRoute("GET", "/users", mockHandler);
      routeAdapter.registerRoute("POST", "/users", mockHandler);
      routeAdapter.registerRoute("PUT", "/users/:id", mockHandler);
      routeAdapter.registerRoute("DELETE", "/users/:id", mockHandler);

      const routes = routeAdapter.getRoutes();
      expect(routes).toHaveLength(4);

      expect(routes[0].method).toBe("GET");
      expect(routes[1].method).toBe("POST");
      expect(routes[2].method).toBe("PUT");
      expect(routes[3].method).toBe("DELETE");
    });

    it("should preserve handler references", () => {
      const handler1 = jest.fn();
      const handler2 = jest.fn();

      routeAdapter.registerRoute("GET", "/path1", handler1);
      routeAdapter.registerRoute("POST", "/path2", handler2);

      const routes = routeAdapter.getRoutes();
      expect(routes[0].handler).toBe(handler1);
      expect(routes[1].handler).toBe(handler2);
    });
  });

  describe("registerGroup", () => {
    it("should register routes from a route group with prefix", () => {
      const mockGroup = new MockRouteGroup([
        { method: "GET", path: "/list", handler: mockHandler },
        { method: "POST", path: "/create", handler: mockHandler },
      ]);

      routeAdapter.registerGroup("/api/v1", mockGroup);

      const routes = routeAdapter.getRoutes();
      expect(routes).toHaveLength(2);
      expect(routes[0].path).toBe("/api/v1/list");
      expect(routes[1].path).toBe("/api/v1/create");
    });

    it("should handle empty route group", () => {
      const emptyGroup = new MockRouteGroup([]);

      routeAdapter.registerGroup("/api", emptyGroup);

      const routes = routeAdapter.getRoutes();
      expect(routes).toHaveLength(0);
    });

    it("should handle multiple route groups", () => {
      const group1 = new MockRouteGroup([
        { method: "GET", path: "/health", handler: mockHandler },
      ]);
      const group2 = new MockRouteGroup([
        { method: "GET", path: "/users", handler: mockHandler },
        { method: "POST", path: "/users", handler: mockHandler },
      ]);

      routeAdapter.registerGroup("/", group1);
      routeAdapter.registerGroup("/api/v1", group2);

      const routes = routeAdapter.getRoutes();
      expect(routes).toHaveLength(3);
      expect(routes[0].path).toBe("/health");
      expect(routes[1].path).toBe("/api/v1/users");
      expect(routes[2].path).toBe("/api/v1/users");
    });

    it("should handle nested route groups", () => {
      class NestedRouteGroup implements IRouteGroup {
        public defineRoutes(adapter: IRouteAdapter): void {
          // Registra uma rota simples
          adapter.registerRoute("GET", "/nested", mockHandler);

          // Registra um sub-grupo
          const subGroup = new MockRouteGroup([
            { method: "GET", path: "/deep", handler: mockHandler },
          ]);
          adapter.registerGroup("/sub", subGroup);
        }

        public getPrefix(): string {
          return "/nested";
        }
      }

      const nestedGroup = new NestedRouteGroup();
      routeAdapter.registerGroup("/api", nestedGroup);

      const routes = routeAdapter.getRoutes();
      expect(routes).toHaveLength(2);
      expect(routes[0].path).toBe("/api/nested");
      expect(routes[1].path).toBe("/api/sub/deep");
    });
  });

  describe("applyRoutes", () => {
    it("should apply GET routes to server", () => {
      routeAdapter.registerRoute("GET", "/test", mockHandler);

      routeAdapter.applyRoutes(mockServer);

      expect(mockServer.get).toHaveBeenCalledWith("/test", mockHandler);
      expect(mockServer.post).not.toHaveBeenCalled();
      expect(mockServer.put).not.toHaveBeenCalled();
      expect(mockServer.delete).not.toHaveBeenCalled();
    });

    it("should apply POST routes to server", () => {
      routeAdapter.registerRoute("POST", "/users", mockHandler);

      routeAdapter.applyRoutes(mockServer);

      expect(mockServer.post).toHaveBeenCalledWith("/users", mockHandler);
      expect(mockServer.get).not.toHaveBeenCalled();
    });

    it("should apply PUT routes to server", () => {
      routeAdapter.registerRoute("PUT", "/users/:id", mockHandler);

      routeAdapter.applyRoutes(mockServer);

      expect(mockServer.put).toHaveBeenCalledWith("/users/:id", mockHandler);
    });

    it("should apply DELETE routes to server", () => {
      routeAdapter.registerRoute("DELETE", "/users/:id", mockHandler);

      routeAdapter.applyRoutes(mockServer);

      expect(mockServer.delete).toHaveBeenCalledWith("/users/:id", mockHandler);
    });

    it("should apply multiple routes with different methods", () => {
      routeAdapter.registerRoute("GET", "/users", mockHandler);
      routeAdapter.registerRoute("POST", "/users", mockHandler);
      routeAdapter.registerRoute("PUT", "/users/:id", mockHandler);
      routeAdapter.registerRoute("DELETE", "/users/:id", mockHandler);

      routeAdapter.applyRoutes(mockServer);

      expect(mockServer.get).toHaveBeenCalledWith("/users", mockHandler);
      expect(mockServer.post).toHaveBeenCalledWith("/users", mockHandler);
      expect(mockServer.put).toHaveBeenCalledWith("/users/:id", mockHandler);
      expect(mockServer.delete).toHaveBeenCalledWith("/users/:id", mockHandler);
    });

    it("should handle empty routes list", () => {
      routeAdapter.applyRoutes(mockServer);

      expect(mockServer.get).not.toHaveBeenCalled();
      expect(mockServer.post).not.toHaveBeenCalled();
      expect(mockServer.put).not.toHaveBeenCalled();
      expect(mockServer.delete).not.toHaveBeenCalled();
    });

    it("should throw error for unsupported HTTP method", () => {
      // Testar com uma classe que estende RouteAdapter para acessar rotas privadas
      class TestableRouteAdapter extends RouteAdapter {
        public forceUnsupportedMethod(): void {
          // Força um método não suportado através de reflexão controlada
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const routesArray = (this as Record<string, any>)["routes"] as Array<{
            method: string;
            path: string;
            handler: IRouteHandler;
          }>;
          routesArray.push({
            method: "PATCH",
            path: "/test",
            handler: mockHandler,
          });
        }
      }

      const testAdapter = new TestableRouteAdapter();
      testAdapter.forceUnsupportedMethod();

      expect(() => {
        testAdapter.applyRoutes(mockServer);
      }).toThrow("Unsupported HTTP method: PATCH");
    });
  });

  describe("getRoutes", () => {
    it("should return empty array when no routes registered", () => {
      const routes = routeAdapter.getRoutes();

      expect(routes).toEqual([]);
      expect(routes).toHaveLength(0);
    });

    it("should return copy of routes array", () => {
      routeAdapter.registerRoute("GET", "/test", mockHandler);

      const routes1 = routeAdapter.getRoutes();
      const routes2 = routeAdapter.getRoutes();

      expect(routes1).toEqual(routes2);
      expect(routes1).not.toBe(routes2); // Different array instances

      // Modifying returned array should not affect internal state
      routes1.push({
        method: "POST",
        path: "/fake",
        handler: mockHandler,
      });

      const routes3 = routeAdapter.getRoutes();
      expect(routes3).toHaveLength(1); // Still only original route
    });

    it("should return all registered routes", () => {
      routeAdapter.registerRoute("GET", "/test1", mockHandler);
      routeAdapter.registerRoute("POST", "/test2", mockHandler);

      const group = new MockRouteGroup([
        { method: "PUT", path: "/group1", handler: mockHandler },
        { method: "DELETE", path: "/group2", handler: mockHandler },
      ]);
      routeAdapter.registerGroup("/api", group);

      const routes = routeAdapter.getRoutes();
      expect(routes).toHaveLength(4);

      const methods = routes.map((r) => r.method);
      const paths = routes.map((r) => r.path);

      expect(methods).toContain("GET");
      expect(methods).toContain("POST");
      expect(methods).toContain("PUT");
      expect(methods).toContain("DELETE");

      expect(paths).toContain("/test1");
      expect(paths).toContain("/test2");
      expect(paths).toContain("/api/group1");
      expect(paths).toContain("/api/group2");
    });
  });

  describe("path combining logic", () => {
    it("should combine root prefix with path", () => {
      const group = new MockRouteGroup([
        { method: "GET", path: "/test", handler: mockHandler },
      ]);

      routeAdapter.registerGroup("/", group);

      const routes = routeAdapter.getRoutes();
      expect(routes[0].path).toBe("/test");
    });

    it("should combine prefix ending with slash", () => {
      const group = new MockRouteGroup([
        { method: "GET", path: "/test", handler: mockHandler },
      ]);

      routeAdapter.registerGroup("/api/", group);

      const routes = routeAdapter.getRoutes();
      expect(routes[0].path).toBe("/api/test");
    });

    it("should handle path not starting with slash", () => {
      const group = new MockRouteGroup([
        { method: "GET", path: "test", handler: mockHandler },
      ]);

      routeAdapter.registerGroup("/api", group);

      const routes = routeAdapter.getRoutes();
      expect(routes[0].path).toBe("/api/test");
    });

    it("should handle complex nested paths", () => {
      const group = new MockRouteGroup([
        { method: "GET", path: "/users/:id/posts", handler: mockHandler },
      ]);

      routeAdapter.registerGroup("/api/v1", group);

      const routes = routeAdapter.getRoutes();
      expect(routes[0].path).toBe("/api/v1/users/:id/posts");
    });
  });

  describe("integration scenarios", () => {
    it("should handle real-world API structure", () => {
      // Health routes (no prefix)
      const healthGroup = new MockRouteGroup([
        { method: "GET", path: "/health", handler: mockHandler },
        { method: "GET", path: "/", handler: mockHandler },
      ]);

      // V1 API routes
      const usersV1Group = new MockRouteGroup([
        { method: "GET", path: "/", handler: mockHandler },
        { method: "POST", path: "/", handler: mockHandler },
        { method: "GET", path: "/:id", handler: mockHandler },
        { method: "PUT", path: "/:id", handler: mockHandler },
        { method: "DELETE", path: "/:id", handler: mockHandler },
      ]);

      routeAdapter.registerGroup("/", healthGroup);
      routeAdapter.registerGroup("/api/v1/users", usersV1Group);

      const routes = routeAdapter.getRoutes();
      expect(routes).toHaveLength(7);

      // Verify health routes
      expect(routes.find((r) => r.path === "/health")).toBeDefined();
      expect(routes.find((r) => r.path === "/")).toBeDefined();

      // Verify users API routes - após correção do combinePaths, "/" não adiciona barra extra
      expect(routes.find((r) => r.path === "/api/v1/users")).toBeDefined();
      expect(routes.find((r) => r.path === "/api/v1/users/:id")).toBeDefined();

      // Apply to server
      routeAdapter.applyRoutes(mockServer);

      expect(mockServer.get).toHaveBeenCalledTimes(4);
      expect(mockServer.post).toHaveBeenCalledTimes(1);
      expect(mockServer.put).toHaveBeenCalledTimes(1);
      expect(mockServer.delete).toHaveBeenCalledTimes(1);
    });

    it("should handle unsupported HTTP method gracefully", () => {
      // Para cobrir a linha 78 do erro de método não suportado,
      // vamos simular um cenário onde isso pode acontecer
      const testAdapter = new RouteAdapter();

      // Registrar rota com método válido
      testAdapter.registerRoute("GET", "/test", mockHandler);

      // Simular comportamento incorreto modificando internamente
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const routes = (testAdapter as Record<string, any>)["routes"] as Array<{
        method: string;
        path: string;
        handler: IRouteHandler;
      }>;
      if (routes && routes.length > 0) {
        routes[0].method = "PATCH"; // Método não suportado
      }

      expect(() => {
        testAdapter.applyRoutes(mockServer);
      }).toThrow("Unsupported HTTP method: PATCH");
    });
  });
});
