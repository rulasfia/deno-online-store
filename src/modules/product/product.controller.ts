// import { helpers } from "oak/mod.ts";
import type { PContext as Context } from "~/utils/ContextHelper.ts";
import { errorResponse } from "~/utils/errorResponse.ts";
import type { GetProductByIdInput, NewProductInput } from "./product.schema.ts";
import {
  createProduct,
  getAllProduct,
  getProductById,
} from "./product.service.ts";

export async function getAllProductHandler(ctx: Context) {
  try {
    const { rows } = await getAllProduct();

    ctx.response.type = "application/json";
    ctx.response.status = 200;
    ctx.response.body = { data: rows };
    return;
  } catch (error) {
    errorResponse(ctx, 500, error);
    return;
  }
}

export async function createProductHandler(ctx: Context) {
  try {
    const body = (await ctx.request.body().value) as NewProductInput["body"];

    const { rows } = await createProduct(body);

    ctx.response.type = "application/json";
    ctx.response.status = 201;
    ctx.response.body = { message: "Product created successfully", data: rows };
    return;
  } catch (error) {
    if (error.name === "ZodError") errorResponse(ctx, 400, error);
    else errorResponse(ctx, 500, error);
    return;
  }
}

export async function getProductByIdHandler(
  ctx: Context<Partial<GetProductByIdInput["params"]>>
) {
  try {
    const id = ctx.params?.id;

    if (!id) {
      errorResponse(ctx, 400);
      return;
    }

    const { rows } = await getProductById(id);

    ctx.response.type = "application/json";
    ctx.response.status = 200;
    ctx.response.body = { message: "Product found", data: rows };
    return;
  } catch (error) {
    if (error.name === "ZodError") errorResponse(ctx, 400, error);
    else errorResponse(ctx, 500, error);
    return;
  }
}
