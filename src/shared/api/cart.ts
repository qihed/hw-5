import api from 'api/api';

/** Raw HTTP calls for cart. Transformation logic lives in CartStore. */
export async function fetchCartRaw(): Promise<unknown> {
  const { data } = await api.get('/cart');
  return data;
}

export async function addCartItem(productId: number, quantity = 1): Promise<void> {
  await api.post('/cart/add', { product: productId, quantity });
}

export async function removeCartItem(productId: number, quantity = 1): Promise<void> {
  await api.post('/cart/remove', { product: productId, quantity });
}
