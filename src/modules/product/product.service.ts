import { nanoid } from "nanoid/mod.ts";
import db from "~/utils/database.ts";
import type { ProductResult } from "./product.dto.ts";

type NewProductType = {
  name: string;
  description: string;
  price: number;
};

export async function getAllProduct() {
  return await db.queryObject<ProductResult>("SELECT * FROM product");
}

export async function createProduct(product: NewProductType) {
  const id = nanoid(10);

  const transaction = db.createTransaction("insert_product");

  await transaction.begin();

  const result =
    await transaction.queryObject<ProductResult>`INSERT INTO product (id, name, description, price) 
      VALUES (${id}, ${product.name}, ${product.description}, ${product.price}) RETURNING *;`;

  await transaction.commit();

  return result;
}

export async function getProductById(id: string) {
  return await db.queryObject<ProductResult>(
    `SELECT * FROM product WHERE id = '${id}'`
  );
}

export async function updateProduct(
  id: string,
  product: Partial<NewProductType>
) {
  const transaction = db.createTransaction("update_product");

  await transaction.begin();

  const result =
    await transaction.queryObject<ProductResult>`UPDATE product SET name = ${product.name}, description = ${product.description}, price = ${product.price} WHERE id = ${id} RETURNING *;`;

  await transaction.commit();

  return result;
}
