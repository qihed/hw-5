/**
 * Layout для /products: пример параллельной загрузки (Promise.all).
 * Запрашиваем товары и категории разом; результат не используем в UI — только для ДЗ.
 */
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? 'https://front-school-strapi.ktsdev.ru/api';

export default async function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [productsRes, categoriesRes] = await Promise.all([
    fetch(`${API_BASE}/products?pagination[pageSize]=5`, {
      next: { revalidate: 60 },
    }),
    fetch(`${API_BASE}/product-categories`, { next: { revalidate: 60 } }),
  ]);
  await Promise.all([productsRes.json(), categoriesRes.json()]);
  return <>{children}</>;
}
