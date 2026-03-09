'use client';

import Link from 'next/link';
import { observer } from 'mobx-react-lite';
import styles from 'components/ProductCardList/ProductCardList.module.scss';
import Card from 'components/Card';
import type { Product } from 'api/types';
import { getProductImageUrl, getProductCategoryName, DEFAULT_PRODUCT_IMAGE } from 'api/products';
import CartQuantityControl from 'components/CartQuantityControl';

export type ProductCardListProps = {
  products: Product[];
  loading?: boolean;
  error?: Error | null;
};

const ProductCardList = ({ products, loading = false, error = null }: ProductCardListProps) => {
  if (error) {
    return (
      <div className={styles.container}>
        <p>Ошибка загрузки: {error.message}</p>
      </div>
    );
  }

  if (loading && products.length === 0) {
    return (
      <div className={styles.container}>
        <p>Загрузка…</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {products.map((product) => (
        <Link
          key={product.documentId}
          href={`/products/${product.documentId}`}
          className={styles.cardLink}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Card
            image={getProductImageUrl(product) || DEFAULT_PRODUCT_IMAGE}
            captionSlot={getProductCategoryName(product) || null}
            title={product.title}
            subtitle={product.description || '—'}
            contentSlot={<>{product.price}₽</>}
            actionSlot={
              <CartQuantityControl
                productId={product.documentId}
                stopLinkNavigation
                addLabel="В корзину"
              />
            }
          />
        </Link>
      ))}
    </div>
  );
};

export default observer(ProductCardList);
