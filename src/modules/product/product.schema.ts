import { z } from "zod/mod.ts";

export const newProductSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
  }),
});

export type NewProductInput = z.infer<typeof newProductSchema>;

export const getProductByIdSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export type GetProductByIdInput = z.infer<typeof getProductByIdSchema>;
