import { Application, Router } from "oak/mod.ts";
import { logger } from "~/middleware/logger.ts";
import { resTimeRecorder } from "~/middleware/resTimeRecorder.ts";
import db from "~/utils/database.ts";

/** import routes */
import productRoutes from "~/modules/product/product.router.ts";

const app = new Application();
const router = new Router();

/** logger */
app.use(logger);
/** response time */
app.use(resTimeRecorder);

try {
  /** connect to database */
  await db.connect();
  console.log("Database Connected...");

  router.get("/", (ctx) => {
    ctx.response.body = { message: "Server is running!" };
    return;
  });

  app.use(productRoutes.routes());
  app.use(productRoutes.allowedMethods());

  console.log("🚀 Server running at http://localhost:8000");
  await app.listen({ port: 8000 });
} catch (e) {
  db.end();
  console.error(e);
  Deno.exit(1);
}
