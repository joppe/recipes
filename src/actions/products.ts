'use server';

import { eq } from 'drizzle-orm';

import db from '@/db/drizzle';
import { ProductFormData, products } from '@/db/schema';

export async function getProducts() {
  return db.select().from(products).orderBy(products.name);
}

export async function addProduct(product: ProductFormData) {
  await db.insert(products).values(product);
}

export async function deleteProduct(id: number) {
  await db.delete(products).where(eq(products.id, id));
}

export async function updateProduct(product: ProductFormData) {
  if (product.id === undefined) {
    throw new Error('Product ID is required');
  }

  await db.update(products).set(product).where(eq(products.id, product.id));
}
