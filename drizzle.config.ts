import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dialect: "sqlite",
  casing: "snake_case",
  driver: "expo",
} satisfies Config;
