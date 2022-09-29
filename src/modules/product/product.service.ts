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
  /** check if product with provided id exist */
  const result = await db.queryObject<ProductResult>(
    `SELECT * FROM product WHERE id = '${id}'`
  );

  /** throw error if product does not exist */
  if (result.rows.length < 1) {
    throw new Error("Not Found", {
      cause: { name: "ProductNotFoundError", message: "Product Not Found" },
    });
  }

  return result;
}

export async function updateProduct(
  id: string,
  product: Partial<NewProductType>
) {
  /** check if product with provided id exist */
  await getProductById(id);

  const transaction = db.createTransaction("update_product");

  await transaction.begin();

  /** update product detail */
  const result =
    await transaction.queryObject<ProductResult>`UPDATE product SET name = ${product.name}, description = ${product.description}, price = ${product.price} WHERE id = ${id} RETURNING *;`;

  await transaction.commit();

  return result;
}

export async function deleteProduct(id: string) {
  /** check if product with provided id exist */
  await getProductById(id);

  const transaction = db.createTransaction("delete_product");

  await transaction.begin();

  const result =
    await transaction.queryObject`DELETE FROM product WHERE id = ${id}`;

  await transaction.commit();

  return result;
}
