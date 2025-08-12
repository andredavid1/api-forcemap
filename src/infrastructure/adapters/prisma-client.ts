import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

// Singleton pattern para garantir uma única instância do Prisma Client
class PrismaService {
  private static instance: PrismaClient | ReturnType<PrismaClient["$extends"]>;

  private constructor() {}

  public static getInstance():
    | PrismaClient
    | ReturnType<PrismaClient["$extends"]> {
    if (!PrismaService.instance) {
      const baseClient = new PrismaClient({
        log:
          process.env.NODE_ENV === "development"
            ? ["query", "info", "warn", "error"]
            : ["error"],
      });

      // Adiciona a extensão Accelerate se estiver configurada
      if (process.env.DATABASE_URL?.includes("prisma://")) {
        PrismaService.instance = baseClient.$extends(withAccelerate());
      } else {
        PrismaService.instance = baseClient;
      }
    }

    return PrismaService.instance;
  }

  public static async disconnect(): Promise<void> {
    if (PrismaService.instance) {
      await (PrismaService.instance as PrismaClient).$disconnect();
    }
  }
}

export const prismaClient = PrismaService.getInstance();
export { PrismaService };
