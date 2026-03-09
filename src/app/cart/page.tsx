'use client';

import { observer } from 'mobx-react-lite';
import Link from 'next/link';

import Header from 'components/Header';
import Text from 'components/Text';
import Button from 'components/Button';
import CartQuantityControl from 'components/CartQuantityControl';
import { useStore } from 'store/StoreContext';

import styles from './cart-page.module.scss';

const CartPage = () => {
  const { cart } = useStore();
  const items = cart.items;

  return (
    <>
      <Header />
      <main className={styles.container}>
        <div className={styles.head}>
          <Text view="title">Корзина</Text>
          <Text view="p-20" color="secondary">
            Товаров: {cart.totalCount}
          </Text>
        </div>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <Text view="p-20">Корзина пуста</Text>
            <Link href="/products" className={styles.backLink}>
              <Text view="p-20">Перейти в каталог</Text>
            </Link>
          </div>
        ) : (
          <>
            <ul className={styles.list}>
              {items.map((item) => (
                <li key={item.productId} className={styles.item}>
                  <div className={styles.meta}>
                    <Text view="p-20">{item.productId}</Text>
                  </div>
                  <CartQuantityControl
                    productId={item.productId}
                    showRemove
                    className={styles.controls}
                  />
                </li>
              ))}
            </ul>

            <div className={styles.footer}>
              <Button type="button" onClick={() => cart.clear()}>
                Очистить корзину
              </Button>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default observer(CartPage);
