import type { Context } from "oak/mod.ts";

export async function logger(ctx: Context, next: () => Promise<unknown>) {
  await next();
  const resTime = ctx.response.headers.get("X-Response-Time");
  const date = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });

  console.log(
    `[${date} WIB] ${ctx.request.method} ${ctx.request.url} - ${resTime}`
  );
  return;
}
