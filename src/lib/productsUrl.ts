export type ProductsPageParams = {
  page?: number;
  search?: string;
  category?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
};

export function getProductsPageUrl(
  params: ProductsPageParams = {}
): { pathname: string; search: string } {
  const { page = 1, search = '', category = null, minPrice, maxPrice } = params;
  const urlParams = new URLSearchParams();
  urlParams.set('page', String(page));
  if (search.trim()) urlParams.set('search', search.trim());
  if (category?.trim()) urlParams.set('category', category.trim());
  if (minPrice != null && Number.isFinite(minPrice) && minPrice > 0) urlParams.set('minPrice', String(minPrice));
  if (maxPrice != null && Number.isFinite(maxPrice) && maxPrice > 0) urlParams.set('maxPrice', String(maxPrice));
  const query = urlParams.toString();
  return { pathname: '/products', search: query };
}
