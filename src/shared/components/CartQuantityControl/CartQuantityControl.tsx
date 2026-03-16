'use client';

import { observer } from 'mobx-react-lite';
import Button from 'components/Button';
import { useStore } from 'store/StoreContext';

import styles from './CartQuantityControl.module.scss';

export type CartQuantityControlProps = {
  productId: number;
  stopLinkNavigation?: boolean;
  addLabel?: string;
  buttonClassName?: string;
  showRemove?: boolean;
  className?: string;
};

const stopLink = (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
};

const CartQuantityControl = ({
  productId,
  stopLinkNavigation = false,
  addLabel = 'В корзину',
  buttonClassName,
  showRemove = false,
  className,
}: CartQuantityControlProps) => {
  const { cart, auth } = useStore();
  const qty = cart.getQuantity(productId);

  const guardAuth = (fn: () => void) => () => {
    if (!auth.isAuth) {
      alert('To add items to your cart, please register first.');
      return;
    }
    fn();
  };

  const wrap = (fn: () => void) =>
    stopLinkNavigation
      ? (e: React.MouseEvent) => {
          stopLink(e);
          fn();
        }
      : () => fn();

  const handleDecrease = wrap(() => {
    if (qty > 0) cart.setQuantity(productId, qty - 1);
  });

  const handleIncrease = wrap(guardAuth(() => {
    cart.addItem(productId, 1);
  }));

  const handleAdd = wrap(guardAuth(() => {
    cart.addItem(productId, 1);
  }));

  const handleRemove = wrap(() => {
    cart.removeItem(productId);
  });

  if (qty > 0) {
    return (
      <div
        className={`${styles.controls} ${className ?? ''}`.trim()}
        onClick={stopLinkNavigation ? stopLink : undefined}
        role="group"
        aria-label="Количество в корзине"
      >
        <Button
          type="button"
          className={buttonClassName}
          onClick={handleDecrease}
          aria-label="Убрать одну"
        >
          −
        </Button>
        <span className={styles.qty}>{qty}</span>
        <Button
          type="button"
          className={buttonClassName}
          onClick={handleIncrease}
          aria-label="Добавить одну"
        >
          +
        </Button>
        {showRemove && (
          <Button type="button" className={buttonClassName} onClick={handleRemove}>
            Удалить
          </Button>
        )}
      </div>
    );
  }

  return (
    <Button className={buttonClassName} onClick={handleAdd}>
      {addLabel}
    </Button>
  );
};

export default observer(CartQuantityControl);
