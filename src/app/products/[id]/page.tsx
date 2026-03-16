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

  if (!product) notFound();

  return <ProductPageClient initialProduct={product} />;
}
