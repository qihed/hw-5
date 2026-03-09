/**
 * Серверная загрузка одного товара по documentId.
 * Запрос к API через fetch с кешем на 60 сек (revalidate).
 * Формат запроса — как в документации Strapi: фильтр по documentId через qs.
 */
import qs from 'qs';
import type { Product } from 'api/types';
import { normalizeProduct, type ProductApi } from 'api/normalizers/product';

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? 'https://front-school-strapi.ktsdev.ru/api';

export async function getProductServer(documentId: string): Promise<Product | null> {
  const query = qs.stringify(
    {
      filters: { documentId: { $eq: documentId } },
      'pagination[pageSize]': 1,
      populate: ['images', 'productCategory'],
    },
    { encode: false }
  );
  const res = await fetch(`${API_BASE}/products?${query}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  const json = await res.json();
  const list = json?.data;
  const raw = Array.isArray(list) && list.length > 0 ? list[0] : null;
  if (!raw) return null;
  return normalizeProduct(raw as ProductApi) as Product;
}
