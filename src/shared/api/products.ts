import { has, isObservable } from 'mobx';
import qs from 'qs';
import api from 'api/api';
import type {
  Product,
  ProductCategory,
  ProductResponse,
  ProductCategoryResponse,
  ProductsResponse,
} from 'api/types';
import { normalizeProduct, type ProductApi } from 'api/normalizers/product';
import { normalizeCategory, type RawCategory } from 'api/normalizers/category';

export const DEFAULT_PRODUCT_IMAGE = 'https://placehold.co/600x600';

export type GetProductsParams = {
  page?: number;
  pageSize?: number;
  sort?: string;
  populate?: string[];
  search?: string;
  categoryIds?: number[];
};

export async function getProducts(params: GetProductsParams = {}): Promise<ProductsResponse> {
  const {
    page = 1,
    pageSize = 25,
    sort,
    populate = ['images', 'productCategory'],
    search,
    categoryIds,
  } = params;

  const filters: Record<string, unknown> = {};
  if (search?.trim()) {
    filters.title = { $containsi: search.trim() };
  }
  if (categoryIds?.length) {
    filters.productCategory =
      categoryIds.length === 1 ? { id: { $eq: categoryIds[0] } } : { id: { $in: categoryIds } };
  }

  const query = qs.stringify(
    {
      populate,
      'pagination[page]': page,
      'pagination[pageSize]': pageSize,
      'pagination[withCount]': true,
      ...(sort && { sort }),
      ...(Object.keys(filters).length > 0 && { filters }),
    },
    { encode: false }
  );

  const { data } = await api.get<ProductsResponse>(`/products?${query}`);
  return {
    ...data,
    data: data.data.map(normalizeProduct),
  };
}

// Нормализация категорий вынесена в api/normalizers/category.ts, используется в getProductCategories
export async function getProductCategories(): Promise<ProductCategoryResponse> {
  const res = await api.get<{ data?: RawCategory[] | { data?: RawCategory[] } }>(
    '/product-categories'
  );
  const raw = res.data;
  const rawList = Array.isArray(raw)
    ? raw
    : Array.isArray((raw as { data?: RawCategory[] }).data)
      ? (raw as { data: RawCategory[] }).data
      : [];
  return { data: rawList.map(normalizeCategory) };
}

export type GetProductParams = {
  populate?: string[];
};

/** Тип ответа бэка по одному товару — один тип данных, без приведения через as */
export async function getProduct(
  id: number | string,
  params: GetProductParams = {}
): Promise<ProductResponse> {
  const { populate = ['images', 'productCategory'] } = params;
  const query = qs.stringify({ populate }, { encode: false });
  const url = query ? `/products/${id}?${query}` : `/products/${id}`;
  const { data } = await api.get<{ data: ProductApi }>(url);
  return { data: normalizeProduct(data.data) };
}

export function getProductImageUrl(product: Product): string | undefined {
  const images = product.images;
  return Array.isArray(images) && images[0] ? images[0].url : undefined;
}

function hasDataKey(obj: object): boolean {
  return isObservable(obj) ? has(obj, 'data') : 'data' in obj;
}

export function getProductCategoryName(product: Product): string {
  const catRaw = product.productCategory;
  const cat: ProductCategory | undefined =
    catRaw == null || typeof catRaw !== 'object'
      ? undefined
      : hasDataKey(catRaw as object)
        ? (catRaw as { data: ProductCategory }).data
        : (catRaw as ProductCategory);
  return cat && typeof cat.name === 'string' ? cat.name : '';
}
