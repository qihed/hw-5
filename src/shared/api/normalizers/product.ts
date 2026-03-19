import type { Product, ProductCategory, StrapiImage } from 'api/types';

/** Raw API product type; use normalizeProduct() to get app Product. */
export type ProductApi = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  price: number;
  discountPercent?: number;
  rating?: number;
  isInStock: boolean;
  images?: StrapiImage[] | { data: StrapiImage[] };
  productCategory?: ProductCategory | { data: ProductCategory };
};

export const normalizeProduct = (from: ProductApi): Product => {
  const images: StrapiImage[] | undefined = Array.isArray(from.images)
    ? from.images
    : from.images &&
        typeof from.images === 'object' &&
        'data' in from.images &&
        Array.isArray((from.images as { data: StrapiImage[] }).data)
      ? (from.images as { data: StrapiImage[] }).data
      : undefined;

  const productCategory: ProductCategory | undefined =
    from.productCategory == null
      ? undefined
      : typeof from.productCategory === 'object' && 'data' in from.productCategory
        ? (from.productCategory as { data: ProductCategory }).data
        : (from.productCategory as ProductCategory);

  return {
    ...from,
    images,
    productCategory,
  };
};
