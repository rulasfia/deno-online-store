import type { Context } from "oak/mod.ts";

export async function resTimeRecorder(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const start = Date.now();
  await next();

  const msTime = Date.now() - start;
  return ctx.response.headers.set("X-Response-Time", `${msTime}ms`);
}
