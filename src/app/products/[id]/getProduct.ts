import qs from 'qs';
import type { Product } from 'api/types';
import { normalizeProduct, type ProductApi } from 'api/normalizers/product';
import { safeFetchJson } from 'lib/safeFetchJson';

import { API_BASE } from 'config/api';

export async function getProductServer(documentId: string): Promise<Product | null> {
  const query = qs.stringify(
    { populate: ['images', 'productCategory'] },
    { encode: false }
  );
  const url = query ? `${API_BASE}/products/${documentId}?${query}` : `${API_BASE}/products/${documentId}`;
  const res = await fetch(url, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  const json = await safeFetchJson<{ data?: ProductApi }>(res);
  const raw = json?.data;
  if (!raw) return null;
  return normalizeProduct(raw);
}
