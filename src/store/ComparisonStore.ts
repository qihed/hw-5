import { makeAutoObservable } from 'mobx';
import type { Product } from 'api/types';
import { LocalStorageModel } from './LocalStorageModel';

const STORAGE_KEY = 'comparison_products';

export class ComparisonStore {
  products: Product[] = [];
  private maxProducts = 12;

  constructor() {
    makeAutoObservable(this);
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const ids = LocalStorageModel.getItemJson<string[]>(STORAGE_KEY, []);
      if (Array.isArray(ids) && ids.length > 0) {
        this.products = ids
          .map((id) => {
            const item = LocalStorageModel.getItemJson<Product | null>(
              `${STORAGE_KEY}_${id}`,
              null
            );
            return item;
          })
          .filter((p): p is Product => p != null);
      }
    } catch {
      return;
    }
  }

  private persist() {
    const ids = this.products.map((p) => p.documentId);
    const oldIds = LocalStorageModel.getItemJson<string[]>(STORAGE_KEY, []);
    LocalStorageModel.setItemJson(STORAGE_KEY, ids);
    this.products.forEach((p) => {
      LocalStorageModel.setItemJson(`${STORAGE_KEY}_${p.documentId}`, p);
    });
    oldIds.forEach((id) => {
      if (!ids.includes(id)) {
        LocalStorageModel.removeItem(`${STORAGE_KEY}_${id}`);
      }
    });
  }

  addProduct(product: Product) {
    if (this.products.some((p) => p.documentId === product.documentId)) return;
    if (this.products.length >= this.maxProducts) return;
    this.products = [...this.products, product];
    this.persist();
  }

  removeProduct(documentId: string) {
    this.products = this.products.filter((p) => p.documentId !== documentId);
    this.persist();
  }

  clear() {
    const ids = this.products.map((p) => p.documentId);
    this.products = [];
    LocalStorageModel.removeItem(STORAGE_KEY);
    ids.forEach((id) => LocalStorageModel.removeItem(`${STORAGE_KEY}_${id}`));
  }

  get count(): number {
    return this.products.length;
  }

  hasProduct(documentId: string): boolean {
    return this.products.some((p) => p.documentId === documentId);
  }
}
