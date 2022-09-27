import type { Context } from "oak/mod.ts";

export type PContext<Params = Record<string, string>> = Context & {
  params?: Params;
};
