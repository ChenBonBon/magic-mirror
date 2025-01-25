import type { CartItem } from "../models/cart";
import { request } from "../request";

export async function getCart() {
  const res = await request.get("/cart");

  return res;
}

export async function addToCart(ids: number[]) {
  const res = await request.post("/cart/add", { ids });

  return res;
}

export async function updateCart(id: number, quantity: number) {
  const res = await request.post<CartItem[]>("/cart/update", {
    image_id: id,
    quantity,
  });

  return res;
}

export async function deleteGoods(id: number) {
  const res = await request.delete<CartItem[]>(`/cart/remove/${id}`);

  return res;
}

export async function deleteGoodsAll() {
  const res = await request.delete<CartItem[]>(`/cart/remove`);

  return res;
}
