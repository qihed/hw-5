/**
 * Безопасный парсинг JSON из fetch Response.
 * API может вернуть HTML (404, 500, редирект) вместо JSON — тогда .json() падает с SyntaxError.
 */
export async function safeFetchJson<T = unknown>(res: Response): Promise<T | null> {
  const contentType = res.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    return null;
  }
  try {
    return (await res.json()) as T;
  } catch {
    return null;
  }
}
