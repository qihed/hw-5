/**
 * Страница одного товара — серверный компонент.
 * Загружаем товар на сервере; если нет — показываем 404 (notFound).
 * Метаданные (title, description) подставляются из данных товара.
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductServer } from './getProduct';
import ProductPageClient from './ProductPageClient';

type PageProps = {
  params: Promise<{ id: string }>;
};

/** Заголовок и описание страницы в браузере берём из товара */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductServer(id);
  if (!product) return { title: 'Товар не найден' };
  const title = product.title ?? 'Товар';
  const description = product.description ?? '';
  return {
    title: `${title} | Lalasia`,
    description: description || undefined,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProductServer(id);

  if (!product) notFound(); // нет товара — показываем страницу 404

  return <ProductPageClient initialProduct={product} />;
}
