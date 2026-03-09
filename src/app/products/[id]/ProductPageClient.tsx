/**
 * Клиентская оболочка страницы товара.
 * Товар приходит уже с сервера (initialProduct); здесь только подгружаем «похожие» и рисуем UI.
 */
'use client';

import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { observer } from 'mobx-react-lite';
import type { Product } from 'api/types';
import { ProductPageStore } from './ProductPageStore';
import { ProductPageStoreProvider } from './ProductPageContext';

import styles from './product-page.module.scss';
import Text from 'components/Text';
import ProductCardList from 'components/ProductCardList';
import SkeletonCard from 'components/Skeleton';
import Header from 'components/Header';
import ProductDetails from './components/ProductDetails';

type ProductPageClientProps = {
  initialProduct: Product;
};

const ProductPageClient = observer(({ initialProduct }: ProductPageClientProps) => {
  const pageStore = useMemo(() => new ProductPageStore(), []);

  useEffect(() => {
    pageStore.setProduct(initialProduct); // подставляем товар с сервера, без повторного запроса
    pageStore.loadSimilar(3);
    return () => pageStore.destroy();
  }, [initialProduct, pageStore]);

  return (
    <>
      <Header />
      <ProductPageStoreProvider store={pageStore}>
        <div className={styles.container}>
          <Link href="/products" className={styles.back}>
            <Image
              className={`${styles.start} ${styles.block}`}
              src="/right-arrow.png"
              alt="arrow nav"
              width={24}
              height={24}
            />
            <Text view="p-20">Назад</Text>
          </Link>
          <ProductDetails />
          <Text className={styles.text}>Total products</Text>
          <div className={styles.field}>
            {pageStore.loadingSimilar ? (
              <div className={styles.skeletonSingle}>
                <SkeletonCard />
              </div>
            ) : (
              <ProductCardList
                products={pageStore.similarProducts}
                loading={pageStore.loadingSimilar}
                error={pageStore.errorSimilar}
              />
            )}
          </div>
        </div>
      </ProductPageStoreProvider>
    </>
  );
});

ProductPageClient.displayName = 'ProductPageClient';

export default ProductPageClient;
