import { Router } from "oak/router.ts";
import { validateResource } from "../../middleware/validateResource.ts";
import {
  createProductHandler,
  deleteProductHandler,
  getAllProductHandler,
  getProductByIdHandler,
  updateProductHandler,
} from "./product.controller.ts";
import {
  deleteProductSchema,
  getProductByIdSchema,
  newProductSchema,
  updateProductSchema,
} from "./product.schema.ts";

const router = new Router();

/** get all product route */
router.get("/products", getAllProductHandler);

/** create new product route */
router.post(
  "/products",
  validateResource(newProductSchema),
  createProductHandler
);

/** get product detail route */
router.get(
  "/products/:id",
  validateResource(getProductByIdSchema),
  getProductByIdHandler
);

/** update product detail route */
router.put(
  "/products/:id",
  validateResource(updateProductSchema),
  updateProductHandler
);

/** delete product route */
router.delete(
  "/products/:id",
  validateResource(deleteProductSchema),
  deleteProductHandler
);

export default router;
