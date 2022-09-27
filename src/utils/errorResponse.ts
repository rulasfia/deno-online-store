import { Context } from "oak/mod.ts";

export function errorResponse<ErrorType>(
  ctx: Context,
  status: 500 | 404 | 400,
  error?: ErrorType
) {
  console.error(error);
  ctx.response.type = "application/json";
  ctx.response.status = status;

  if (status === 404) {
    ctx.response.body = { message: "Not found", error };
  }

  if (status === 400) {
    ctx.response.body = { message: "Client error, bad request", error };
  }

  if (status === 500) {
    ctx.response.body = { message: "Internal server error", error };
  }

  return;
}
