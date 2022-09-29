import { Context } from "oak/mod.ts";

type ErrorResponseParams<T> = {
  status: 500 | 404 | 400;
  msg?: string;
  error?: T;
};

export function errorResponse<ErrorType>(
  ctx: Context,
  { status, msg, error }: ErrorResponseParams<ErrorType>
) {
  console.error(error);
  ctx.response.type = "application/json";
  ctx.response.status = status;

  if (status === 404) {
    ctx.response.body = { message: msg ?? "Not found", error };
  }

  if (status === 400) {
    ctx.response.body = {
      message: msg ?? "Client error, bad request",
      error,
    };
  }

  if (status === 500) {
    ctx.response.body = { message: msg ?? "Internal server error", error };
  }

  return;
}
