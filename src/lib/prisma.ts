import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function resolveDatabaseUrl(): string {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL no está configurada");
  }

  if (url.startsWith("prisma+postgres://")) {
    try {
      const apiKey = new URL(url).searchParams.get("api_key");
      if (apiKey) {
        const decoded = JSON.parse(
          Buffer.from(apiKey, "base64").toString("utf-8"),
        ) as { databaseUrl?: string };
        if (decoded.databaseUrl) {
          return decoded.databaseUrl.replace(/^postgres:/, "postgresql:");
        }
      }
    } catch {
      // Fall through to raw URL handling below.
    }
  }

  return url.replace(/^postgres:/, "postgresql:");
}

function createPrismaClient() {
  const adapter = new PrismaPg({
    connectionString: resolveDatabaseUrl(),
  });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
