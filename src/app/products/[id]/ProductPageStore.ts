import { makeAutoObservable, runInAction } from 'mobx';
import type { Product } from 'api/types';
import { getProduct, getProducts } from 'api/products';

export class ProductPageStore {
  product: Product | null = null;
  loadingProductId = false;
  errorProductId: Error | null = null;

  similarProducts: Product[] = [];
  loadingSimilar = false;
  errorSimilar: Error | null = null;

  private productRequestId = 0;
  private similarRequestId = 0;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async loadProduct(id: number | string | null | undefined) {
    if (id === null || id === undefined || id === '') {
      this.product = null;
      this.errorProductId = null;
      this.loadingProductId = false;
      return;
    }
    const myRequest = ++this.productRequestId;
    this.loadingProductId = true;
    this.errorProductId = null;

    try {
      const res = await getProduct(id, {
        populate: ['images', 'productCategory'],
      });

      if (myRequest !== this.productRequestId) return;

      runInAction(() => {
        this.product = res.data;
      });
    } catch (e) {
      if (myRequest !== this.productRequestId) return;

      runInAction(() => {
        this.errorProductId = e instanceof Error ? e : new Error(String(e));
      });
    } finally {
      if (myRequest === this.productRequestId) {
        runInAction(() => {
          this.loadingProductId = false;
        });
      }
    }
  }

  async loadSimilar(pageSize: number) {
    const myRequest = ++this.similarRequestId;

    this.loadingSimilar = true;
    this.errorSimilar = null;

    try {
      const res = await getProducts({
        page: 1,
        pageSize,
        populate: ['images', 'productCategory'],
      });

      if (myRequest !== this.similarRequestId) return;

      runInAction(() => {
        this.similarProducts = res.data;
      });
    } catch (e) {
      if (myRequest !== this.similarRequestId) return;

      runInAction(() => {
        this.errorSimilar = e instanceof Error ? e : new Error(String(e));
      });
    } finally {
      if (myRequest === this.similarRequestId) {
        runInAction(() => {
          this.loadingSimilar = false;
        });
      }
    }
  }

  /** Подставить товар с сервера, чтобы не дергать API ещё раз */
  setProduct(product: Product | null) {
    this.product = product;
  }

  destroy() {
    this.productRequestId++;
    this.similarRequestId++;
    this.product = null;
    this.loadingProductId = false;
    this.errorProductId = null;
    this.similarProducts = [];
    this.loadingSimilar = false;
    this.errorSimilar = null;
  }
}
