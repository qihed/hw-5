'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react-lite';
import Text from 'components/Text';
import Button from 'components/Button';
import { useStore } from 'store/StoreContext';
import { getProducts, getProductImageUrl, getProductCategoryName, DEFAULT_PRODUCT_IMAGE } from 'api/products';
import type { Product } from 'api/types';
import { appendOrderToStorage, readOrdersFromStorage, type Order } from 'lib/ordersStorage';
import styles from './cart-page.module.scss';

const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const ProfileCartPage = () => {
  const router = useRouter();
  const { cart } = useStore();
  const items = cart.items;
  const [products, setProducts] = useState<Record<number, Product>>({});
  const [loading, setLoading] = useState(true);
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      queueMicrotask(() => {
        setProducts({});
        setLoading(false);
      });
      return;
    }

    const ids = items.map((item) => item.productId);
    getProducts({ productIds: ids, pageSize: ids.length })
      .then((res) => {
        const map: Record<number, Product> = {};
        res.data.forEach((p) => {
          map[p.id] = p;
        });
        setProducts(map);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [items]);

  const getSubtotal = () => {
    return items.reduce((sum, item) => {
      const product = products[item.productId];
      const price = product?.price ?? 0;
      return sum + price * (item.quantity ?? 1);
    }, 0);
  };

  const subtotal = getSubtotal();

  const handleCheckout = async () => {
    if (items.length === 0 || loading) return;
    setCheckingOut(true);
    try {
      const orderItems = items.map((item) => {
        const product = products[item.productId];
        const price = product?.price ?? 0;
        const qty = item.quantity ?? 1;
        return {
          name: product?.title ?? `Product ${item.productId}`,
          quantity: qty,
          price,
          image: product ? getProductImageUrl(product) ?? '' : '',
        };
      });
      const existing = readOrdersFromStorage();
      const nextId = existing.length > 0 ? Math.max(...existing.map((o) => o.id)) + 1 : 1;
      const order: Order = {
        id: nextId,
        status: 'processing',
        statusLabel: 'Processing',
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        total: subtotal,
        items: orderItems,
      };
      appendOrderToStorage(order);
      await cart.clear();
      router.push('/profile/orders');
    } finally {
      setCheckingOut(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className={styles.container}>
        <Text view="title" tag="h1" className={styles.title}>
          Cart
        </Text>
        <div className={styles.empty}>
          <Text view="p-20">Your cart is empty</Text>
          <Link href="/products" className={styles.backLink}>
            <Text view="p-18" color="accent">
              Browse Products
            </Text>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Text view="title" tag="h1" className={styles.title}>
        Cart
      </Text>

      {loading ? (
        <Text view="p-16" color="secondary">
          Loading...
        </Text>
      ) : (
        <div className={styles.cartLayout}>
          <div className={styles.cartItems}>
            {items.map((item) => {
              const product = products[item.productId];
              const imageUrl = product ? getProductImageUrl(product) ?? DEFAULT_PRODUCT_IMAGE : DEFAULT_PRODUCT_IMAGE;
              const name = product?.title ?? `Product ${item.productId}`;
              const category = product ? getProductCategoryName(product) : '';
              const price = product?.price ?? 0;
              const qty = item.quantity ?? 1;
              const totalPrice = price * qty;

              return (
                <div key={item.productId} className={styles.cartItem}>
                  <div className={styles.itemImageWrap}>
                    <Image
                      src={imageUrl}
                      alt={name}
                      fill
                      sizes="80px"
                      className={styles.itemImage}
                    />
                  </div>

                  <div className={styles.itemDetails}>
                    <Text view="p-16" weight="medium">
                      {name}
                    </Text>
                    {category && (
                      <Text view="p-14" color="secondary">
                        {category}
                      </Text>
                    )}
                    <div className={styles.quantityControls}>
                      <button
                        type="button"
                        className={styles.qtyBtn}
                        onClick={() => cart.setQuantity(item.productId, qty - 1)}
                      >
                        −
                      </button>
                      <span className={styles.qtyValue}>{qty}</span>
                      <button
                        type="button"
                        className={styles.qtyBtn}
                        onClick={() => cart.addItem(item.productId, 1)}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className={styles.deleteBtn}
                        onClick={() => cart.removeItem(item.productId)}
                        aria-label="Remove"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </div>

                  <div className={styles.itemPricing}>
                    <Text view="p-18" weight="bold">
                      {totalPrice.toFixed(2)} ₽
                    </Text>
                    {qty > 1 && (
                      <Text view="p-14" color="secondary">
                        {price.toFixed(2)} ₽ each
                      </Text>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.summary}>
            <Text view="p-18" weight="bold" className={styles.summaryTitle}>
              Summary
            </Text>
            <div className={styles.summaryRow}>
              <Text view="p-16" color="secondary">
                Subtotal
              </Text>
              <Text view="p-16">{subtotal.toFixed(2)} ₽</Text>
            </div>
            <div className={styles.summaryRow}>
              <Text view="p-16" color="secondary">
                Shipping
              </Text>
              <Text view="p-16" color="accent">
                Free
              </Text>
            </div>
            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
              <Text view="p-20" weight="bold">
                Total
              </Text>
              <Text view="p-20" weight="bold">
                {subtotal.toFixed(2)} ₽
              </Text>
            </div>

            <Button
              type="button"
              className={styles.checkoutButton}
              onClick={handleCheckout}
              disabled={checkingOut}
            >
              {checkingOut ? 'Processing...' : 'Checkout'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default observer(ProfileCartPage);
