import { Client } from "postgres/mod.ts";
import {
  DB_HOST,
  DB_NAME,
  DB_OPTIONS,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "./environment.ts";

const db = new Client({
  hostname: DB_HOST ?? "127.0.0.1",
  user: DB_USER ?? "postgres",
  password: DB_PASSWORD ?? "",
  database: DB_NAME ?? "",
  port: DB_PORT ?? 26257,
  options: DB_OPTIONS ?? "",
});

export default db;
