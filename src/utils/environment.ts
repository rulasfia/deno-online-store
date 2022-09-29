import { config as configEnvFile } from "dotenv/mod.ts";

await configEnvFile({ safe: true, export: true });

export const {
  DB_HOST = "127.0.0.1",
  DB_PASSWORD = "11223344",
  DB_USER = "postgres",
  DB_NAME = "tokoline",
  DB_PORT = 5432,
  DB_OPTIONS = "",
} = Deno.env.toObject();
