import qs from 'qs';
import type { Product, ProductCategory, ProductsResponse } from 'api/types';
import { normalizeProduct, type ProductApi } from 'api/normalizers/product';
import { normalizeCategory, type RawCategory } from 'api/normalizers/category';
import { safeFetchJson } from 'lib/safeFetchJson';
import { API_BASE } from 'config/api';
const PAGE_SIZE = 24;

export type ProductsPageParams = {
  page: number;
  search: string;
  categoryIds: number[];
  priceMin?: number;
  priceMax?: number;
};

function filterByPrice(
  products: Product[],
  priceMin?: number,
  priceMax?: number
): Product[] {
  if (priceMin == null && priceMax == null) return products;
  return products.filter((p) => {
    const price = typeof p.price === 'number' ? p.price : 0;
    if (priceMin != null && priceMin > 0 && price < priceMin) return false;
    if (priceMax != null && priceMax > 0 && price > priceMax) return false;
    return true;
  });
}

async function fetchProductsFromStrapi(params: {
  page: number;
  pageSize: number;
  search?: string;
  categoryIds?: number[];
}): Promise<ProductsResponse> {
  const { page, pageSize, search, categoryIds } = params;
  const filters: Record<string, unknown> = {};
  if (search?.trim()) {
    filters.title = { $containsi: search.trim() };
  }
  if (categoryIds?.length) {
    filters.productCategory =
      categoryIds.length === 1
        ? { id: { $eq: categoryIds[0] } }
        : { id: { $in: categoryIds } };
  }
  const query = qs.stringify(
    {
      populate: ['images', 'productCategory'],
      'pagination[page]': page,
      'pagination[pageSize]': pageSize,
      'pagination[withCount]': true,
      ...(Object.keys(filters).length > 0 && { filters }),
    },
    { encodeValuesOnly: true }
  );
  const res = await fetch(`${API_BASE}/products?${query}`, {
    next: { revalidate: 30 },
  });
  if (!res.ok) {
    throw new Error(`Strapi products failed: ${res.status}`);
  }
  const json = await res.json();
  const list = Array.isArray(json?.data) ? json.data : [];
  const meta = json?.meta?.pagination ?? {
    page: 1,
    pageSize,
    pageCount: 1,
    total: list.length,
  };
  return {
    data: list.map((raw: ProductApi) => normalizeProduct(raw) as Product),
    meta: { pagination: meta },
  };
}

export async function fetchProductsPage(params: ProductsPageParams): Promise<{
  products: Product[];
  total: number;
  pageCount: number;
  currentPage: number;
}> {
  const { page, search, categoryIds, priceMin, priceMax } = params;
  const hasPriceFilter =
    (priceMin != null && priceMin > 0) || (priceMax != null && priceMax > 0);

  if (!hasPriceFilter) {
    const res = await fetchProductsFromStrapi({
      page,
      pageSize: PAGE_SIZE,
      search: search || undefined,
      categoryIds: categoryIds.length ? categoryIds : undefined,
    });
    const total = res.meta.pagination.total;
    const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const currentPage = Math.min(page, pageCount);
    return {
      products: res.data,
      total,
      pageCount,
      currentPage,
    };
  }

  const first = await fetchProductsFromStrapi({
    page: 1,
    pageSize: PAGE_SIZE,
    search: search || undefined,
    categoryIds: categoryIds.length ? categoryIds : undefined,
  });
  const strapiTotal = first.meta.pagination.total;
  const strapiPageCount = first.meta.pagination.pageCount ?? Math.ceil(strapiTotal / PAGE_SIZE);
  let all: Product[] = [...first.data];

  for (let p = 2; p <= strapiPageCount; p++) {
    const next = await fetchProductsFromStrapi({
      page: p,
      pageSize: PAGE_SIZE,
      search: search || undefined,
      categoryIds: categoryIds.length ? categoryIds : undefined,
    });
    all = all.concat(next.data);
  }

  const filtered = filterByPrice(all, priceMin, priceMax);
  const total = filtered.length;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const start = (currentPage - 1) * PAGE_SIZE;
  const products = filtered.slice(start, start + PAGE_SIZE);

  return { products, total, pageCount, currentPage };
}

export async function fetchCategoriesServer(): Promise<ProductCategory[]> {
  const res = await fetch(`${API_BASE}/product-categories`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return [];
  const json = await safeFetchJson<{ data?: RawCategory[] } | RawCategory[]>(res);
  const rawList = json && Array.isArray((json as { data?: RawCategory[] }).data)
    ? (json as { data: RawCategory[] }).data
    : Array.isArray(json)
      ? (json as RawCategory[])
      : [];
  return rawList.map((raw: RawCategory) => normalizeCategory(raw));
}
