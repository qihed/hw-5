import qs from 'qs';
import api from 'api/api';
import type {
  Product,
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
  productIds?: number[];
};

export async function getProducts(params: GetProductsParams = {}): Promise<ProductsResponse> {
  const {
    page = 1,
    pageSize = 25,
    sort,
    populate = ['images', 'productCategory'],
    search,
    categoryIds,
    productIds,
  } = params;

  const filters: Record<string, unknown> = {};
  if (search?.trim()) {
    filters.title = { $containsi: search.trim() };
  }
  if (categoryIds?.length) {
    filters.productCategory =
      categoryIds.length === 1 ? { id: { $eq: categoryIds[0] } } : { id: { $in: categoryIds } };
  }
  if (productIds?.length) {
    filters.id = productIds.length === 1 ? { $eq: productIds[0] } : { $in: productIds };
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
    { encodeValuesOnly: true }
  );

  const { data } = await api.get<ProductsResponse>(`/products?${query}`);
  return {
    ...data,
    data: data.data.map(normalizeProduct),
  };
}

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

export async function getProduct(
  id: number | string,
  params: GetProductParams = {}
): Promise<ProductResponse> {
  const { populate = ['images', 'productCategory'] } = params;
  const query = qs.stringify({ populate }, { encodeValuesOnly: true });
  const url = query ? `/products/${id}?${query}` : `/products/${id}`;
  const { data } = await api.get<{ data: ProductApi }>(url);
  return { data: normalizeProduct(data.data) };
}

export function getProductImageUrl(product: Product): string | undefined {
  const images = product.images;
  return Array.isArray(images) && images[0] ? images[0].url : undefined;
}

export function getProductCategoryName(product: Product): string {
  const cat = product.productCategory;
  const catName = cat && (typeof cat.name === 'string' ? cat.name : (cat as { title?: string }).title);
  return typeof catName === 'string' ? catName : '';
}
