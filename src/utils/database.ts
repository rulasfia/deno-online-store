import { Client } from "postgres/mod.ts";
import * as env from "./environment.ts";

const db = new Client({
  hostname: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  port: env.DB_PORT,
  options: env.DB_OPTIONS,
});

export default db;
