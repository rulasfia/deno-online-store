import { Client } from "postgres/mod.ts";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from "./environment.ts";

const db = new Client({
  hostname: DB_HOST ?? "127.0.0.1",
  user: DB_USER ?? "postgres",
  password: DB_PASSWORD ?? "",
  database: DB_NAME ?? "",
});

export default db;
