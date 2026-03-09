import type { CartItem } from 'api/types';
import rootStore from 'store/instance';

// Тонкие обёртки над store: вся логика корзины в CartStore, здесь только делегирование для API-слоя
export function getCart(): CartItem[] {
  return rootStore.cart.items;
}

export function addCartItem({ productId, quantity = 1 }: CartItem): boolean {
  try {
    rootStore.cart.addItem(productId, quantity);
    return true;
  } catch {
    return false;
  }
}

export function editCartItem({ productId, quantity }: CartItem): boolean {
  try {
    const qty = quantity ?? 1;
    if (qty === 0) {
      rootStore.cart.removeItem(productId);
    } else {
      rootStore.cart.setQuantity(productId, qty);
    }
    return true;
  } catch {
    return false;
  }
}
