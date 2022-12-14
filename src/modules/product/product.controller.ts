// import { helpers } from "oak/mod.ts";
import type { PContext as Context } from "~/utils/ContextHelper.ts";
import { errorResponse } from "~/utils/errorResponse.ts";
import type {
  DeleteProductInput,
  GetProductByIdInput,
  NewProductInput,
  UpdateProductInput,
} from "./product.schema.ts";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProductById,
  updateProduct,
} from "./product.service.ts";

export async function getAllProductHandler(ctx: Context) {
  try {
    const { rows } = await getAllProduct();

    ctx.response.type = "application/json";
    ctx.response.status = 200;
    ctx.response.body = { data: rows };
    return;
  } catch (error) {
    errorResponse(ctx, { status: 500, error });
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
    errorResponse(ctx, { status: 500, error });
    return;
  }
}

export async function getProductByIdHandler(
  ctx: Context<Partial<GetProductByIdInput["params"]>>
) {
  try {
    const id = ctx.params?.id;

    if (!id) {
      errorResponse(ctx, { status: 400 });
      return;
    }

    const { rows } = await getProductById(id);

    ctx.response.type = "application/json";
    ctx.response.status = 200;
    ctx.response.body = { message: "Product found", data: rows };
    return;
  } catch (error) {
    if (error.message === "Not Found") {
      errorResponse(ctx, { status: 404, msg: "Product Not Found", error });
      return;
    }

    errorResponse(ctx, { status: 500, error });
    return;
  }
}

export async function updateProductHandler(
  ctx: Context<Partial<UpdateProductInput["params"]>>
) {
  try {
    const id = ctx.params?.id;

    if (!id) {
      errorResponse(ctx, { status: 400 });
      return;
    }

    const body = (await ctx.request.body().value) as UpdateProductInput["body"];

    const { rows } = await updateProduct(id, body);

    ctx.response.type = "application/json";
    ctx.response.status = 200;
    ctx.response.body = { message: "Product updated successfully", data: rows };
  } catch (error) {
    if (error.message === "Not Found") {
      errorResponse(ctx, { status: 404, msg: "Product Not Found", error });
      return;
    }

    errorResponse(ctx, { status: 500, error });
    return;
  }
}

export async function deleteProductHandler(
  ctx: Context<Partial<DeleteProductInput["params"]>>
) {
  try {
    const id = ctx.params?.id;

    if (!id) {
      errorResponse(ctx, { status: 400 });
      return;
    }

    const { rows } = await deleteProduct(id);

    ctx.response.type = "application/json";
    ctx.response.status = 200;
    ctx.response.body = { message: "Product deleted successfully", data: rows };
  } catch (error) {
    if (error.message === "Not Found") {
      errorResponse(ctx, { status: 404, msg: "Product Not Found", error });
      return;
    }

    errorResponse(ctx, { status: 500, error });
    return;
  }
}
