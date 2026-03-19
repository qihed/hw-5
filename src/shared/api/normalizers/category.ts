import type { ProductCategory } from 'api/types';

/** Сырой ответ Strapi: в списке категорий могут приходить name/title/slug в attributes */
export type RawCategory = ProductCategory & {
  attributes?: { name?: string; slug?: string };
  title?: string;
};

/** Единая нормализация категории: из списка категорий и из списка товаров (если приходит меньше полей) */
export function normalizeCategory(raw: RawCategory): ProductCategory {
  const name = raw.name ?? raw.title ?? raw.attributes?.name ?? raw.slug ?? raw.attributes?.slug;
  const slug = raw.slug ?? raw.attributes?.slug;
  return {
    ...raw,
    name: name ?? undefined,
    slug: slug ?? undefined,
  };
}
