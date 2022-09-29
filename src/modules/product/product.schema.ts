import { z } from "zod/mod.ts";

/** Schemas */
export const newProductSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
  }),
});

export const getProductByIdSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const updateProductSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
  }),
});

/** Typescript defs */
export type NewProductInput = z.infer<typeof newProductSchema>;
export type GetProductByIdInput = z.infer<typeof getProductByIdSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
