import { Router } from "oak/router.ts";
import { validateResource } from "../../middleware/validateResource.ts";
import {
  createProductHandler,
  getAllProductHandler,
  getProductByIdHandler,
} from "./product.controller.ts";
import { getProductByIdSchema, newProductSchema } from "./product.schema.ts";

const router = new Router();

/** temporary main route */
router.get("/", (ctx) => {
  ctx.response.body = { message: "Server is running!" };
  return;
});

router.get("/products", getAllProductHandler);
router.post(
  "/products",
  validateResource(newProductSchema),
  createProductHandler
);
router.get(
  "/products/:id",
  validateResource(getProductByIdSchema),
  getProductByIdHandler
);

export default router;
