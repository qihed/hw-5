import { fetchProductsPage, fetchCategoriesServer } from './getProductsServer';
import ProductsContent from './ProductsContent';

function parseCategoryIds(param: string | null): number[] {
  if (!param?.trim()) return [];
  const raw = typeof param === 'string' ? param : String(param ?? '');
  return raw
    .split(',')
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => !Number.isNaN(n));
}

function parsePrice(param: string | null | undefined): number | undefined {
  if (param == null || (typeof param === 'string' && !param.trim())) return undefined;
  const s = typeof param === 'string' ? param.trim() : String(param);
  const n = parseInt(s, 10);
  return Number.isNaN(n) || n < 0 ? undefined : n;
}

function getParam(
  searchParams: Record<string, string | string[] | undefined>,
  key: string
): string | null {
  const v = searchParams[key];
  if (v == null) return null;
  return Array.isArray(v) ? v[0] ?? null : v;
}

export default async function ProductsPage({
  searchParams: searchParamsMaybePromise,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>> | Record<string, string | string[] | undefined>;
}) {
  const searchParams =
    searchParamsMaybePromise && typeof (searchParamsMaybePromise as Promise<unknown>).then === 'function'
      ? await (searchParamsMaybePromise as Promise<Record<string, string | string[] | undefined>>)
      : (searchParamsMaybePromise as Record<string, string | string[] | undefined>);

  const pageParam = getParam(searchParams, 'page');
  const searchQuery = getParam(searchParams, 'search') ?? '';
  const categoryParam = getParam(searchParams, 'category');
  const minPriceParam = getParam(searchParams, 'minPrice');
  const maxPriceParam = getParam(searchParams, 'maxPrice');

  const pageNumber = Math.max(1, parseInt(pageParam || '1', 10) || 1);
  const categoryIds = parseCategoryIds(categoryParam);
  const priceMin = parsePrice(minPriceParam);
  const priceMax = parsePrice(maxPriceParam);

  const [pageData, categories] = await Promise.all([
    fetchProductsPage({
      page: pageNumber,
      search: searchQuery,
      categoryIds,
      priceMin,
      priceMax,
    }),
    fetchCategoriesServer(),
  ]);

  return (
    <ProductsContent
      products={pageData.products}
      total={pageData.total}
      pageCount={pageData.pageCount}
      currentPage={pageData.currentPage}
      categories={categories}
      searchQuery={searchQuery}
      categoryIds={categoryIds}
      priceMin={priceMin}
      priceMax={priceMax}
      categoryParam={categoryParam}
      minPriceParam={minPriceParam}
      maxPriceParam={maxPriceParam}
    />
  );
}
