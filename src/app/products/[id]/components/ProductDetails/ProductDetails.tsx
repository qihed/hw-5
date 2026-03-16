'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react-lite';
import { useParams } from 'next/navigation';
import Button from 'components/Button';
import Text from 'components/Text';
import CartQuantityControl from 'components/CartQuantityControl';
import styles from './product-details.module.scss';
import { getProductImageUrl, DEFAULT_PRODUCT_IMAGE } from 'api/products';
import ProductDetailsSkeleton from './ProductDetailsSkeleton';
import { useProductPageStore } from '../../ProductPageContext';
import { createOrderFromItems } from 'lib/ordersStorage';

const ProductDetails = () => {
  const router = useRouter();
  const params = useParams();
  const [buyingNow, setBuyingNow] = useState(false);
  const id = params?.id as string | undefined;
  const store = useProductPageStore();
  const product = store.product;
  const error = store.errorProductId;
  const loading =
    store.loadingProductId ||
    (id != null && (store.product == null || String(store.product.documentId) !== String(id)));

  if (error) {
    return (
      <div className={styles.container}>
        <p>Ошибка загрузки: {error.message}</p>
      </div>
    );
  }

  if (loading) {
    return <ProductDetailsSkeleton />;
  }

  if (!product) {
    return (
      <div className={styles.container}>
        <p>Товар не найден</p>
      </div>
    );
  }

  const imageUrl = getProductImageUrl(product) ?? DEFAULT_PRODUCT_IMAGE;

  const handleBuyNow = () => {
    setBuyingNow(true);
    try {
      createOrderFromItems([
        {
          name: product.title,
          quantity: 1,
          price: product.price,
          image: imageUrl,
        },
      ]);
      router.push('/profile/orders');
    } finally {
      setBuyingNow(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imgItem}>
        <Image
          src={imageUrl}
          alt={product.title}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 375px, 600px"
        />
      </div>

      <div className={styles.info}>
        <div className={styles.text}>
          <Text view="title">{product.title}</Text>
          <Text view="p-20" color="secondary" className={styles.text}>
            {product.description}
          </Text>
        </div>

        <div className={styles.action}>
          <Text view="title">{product.price}₽</Text>
          <div className={styles.btnFrame}>
            <Button type="button" onClick={handleBuyNow} disabled={buyingNow}>
              {buyingNow ? 'Processing...' : 'Buy Now'}
            </Button>
            {/* Единый addLabel по проекту (дефолт «В корзину»), без дублирования по языкам */}
            <CartQuantityControl
              productId={product.id}
              buttonClassName={styles.btnCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(ProductDetails);
