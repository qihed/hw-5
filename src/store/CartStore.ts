import { makeAutoObservable, reaction } from 'mobx';
import type { CartItem } from 'api/types';
import { CART_KEY } from 'config/storage';
import { LocalStorageModel } from 'store/LocalStorageModel';
import { ListByIdModel } from 'store/ListByIdModel';

const getCartItemId = (item: CartItem) => item.productId;

export class CartStore {
  items: CartItem[] = [];

  constructor() {
    makeAutoObservable(this);
    this.items = LocalStorageModel.getItemJson(CART_KEY, []);
    reaction(
      () => this.items,
      (items) => LocalStorageModel.setItemJson(CART_KEY, items),
      { fireImmediately: false }
    );
  }

  addItem(productId: string, quantity = 1) {
    const existing = ListByIdModel.getById(this.items, getCartItemId, productId);
    const currentQty = existing?.quantity ?? 0;
    this.setQuantity(productId, currentQty + quantity);
  }

  removeItem(productId: string) {
    this.items = ListByIdModel.removeById(this.items, getCartItemId, productId);
  }

  setQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }
    const index = ListByIdModel.getIndexById(this.items, getCartItemId, productId);
    if (index >= 0) {
      this.items = this.items.map((item, i) =>
        i === index ? { ...item, productId, quantity } : item
      );
    } else {
      this.items = [...this.items, { productId, quantity }];
    }
  }

  clear() {
    this.items = [];
  }

  get totalCount(): number {
    return this.items.reduce((sum, item) => sum + (item.quantity ?? 1), 0);
  }

  getQuantity(productId: string): number {
    const item = ListByIdModel.getById(this.items, getCartItemId, productId);
    return item?.quantity ?? 0;
  }
}
