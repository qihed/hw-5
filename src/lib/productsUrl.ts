export type ProductsPageParams = {
  page?: number;
  search?: string;
  category?: string | null;
};

/** Возвращает { pathname, search } вместо склейки URL вручную — удобно для роутера и единообразия */
export function getProductsPageUrl(
  params: ProductsPageParams = {}
): { pathname: string; search: string } {
  const { page = 1, search = '', category = null } = params;
  const urlParams = new URLSearchParams();
  urlParams.set('page', String(page));
  if (search.trim()) urlParams.set('search', search.trim());
  if (category?.trim()) urlParams.set('category', category.trim());
  const query = urlParams.toString();
  return { pathname: '/products', search: query };
}
