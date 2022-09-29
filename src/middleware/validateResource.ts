import type { AnyZodObject } from "zod/mod.ts";
import type { PContext as Context } from "~/utils/ContextHelper.ts";
import { errorResponse } from "~/utils/errorResponse.ts";

export function validateResource(schema: AnyZodObject) {
  return async function (ctx: Context, next: () => Promise<unknown>) {
    try {
      await schema.parseAsync({
        body: await ctx.request.body().value,
        query: ctx.request.url.search,
        params: ctx.params,
      });

      return next();
    } catch (error) {
      errorResponse(ctx, { status: 400, error });
      return;
    }
  };
}
