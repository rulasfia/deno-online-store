export const {
  DB_HOST = "127.0.0.1",
  DB_PASSWORD = "11223344",
  DB_USER = "postgres",
  DB_NAME = "tokoline",
} = Deno.env.toObject();
