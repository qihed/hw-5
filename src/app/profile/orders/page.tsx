'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Text from 'components/Text';
import { readOrdersFromStorage, removeOrderFromStorage, type Order } from 'lib/ordersStorage';
import styles from './orders-page.module.scss';

const statusClass: Record<Order['status'], string> = {
  delivered: 'statusDelivered',
  in_transit: 'statusInTransit',
  processing: 'statusProcessing',
};

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(readOrdersFromStorage());
  }, []);

  const handleRemoveOrder = useCallback((orderId: number) => {
    removeOrderFromStorage(orderId);
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  }, []);

  return (
    <div className={styles.container}>
      <Text view="title" tag="h1" className={styles.title}>
        My Orders
      </Text>

      {orders.length === 0 ? (
        <div className={styles.empty}>
          <Text view="p-20" color="secondary">
            You have no orders yet.
          </Text>
        </div>
      ) : (
        <div className={styles.ordersList}>
          {orders.map((order) => (
          <div key={order.id} className={styles.orderCard}>
            <div className={styles.orderHeader}>
              <div className={styles.orderInfo}>
                <div className={styles.orderTitleRow}>
                  <Text view="p-18" weight="bold">
                    Order #{order.id}
                  </Text>
                  <span className={`${styles.statusBadge} ${styles[statusClass[order.status]]}`}>
                    {order.statusLabel}
                  </span>
                </div>
                <Text view="p-14" color="secondary">
                  {order.date}
                </Text>
              </div>
              <div className={styles.orderTotal}>
                <Text view="p-14" color="secondary">
                  Total
                </Text>
                <Text view="p-20" weight="bold">
                  {order.total.toFixed(2)} ₽
                </Text>
              </div>
            </div>

            <div className={styles.orderItems}>
              {order.items.map((item, idx) => (
                <div key={idx} className={styles.orderItem}>
                  <div className={styles.itemImage}>
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        className={styles.itemImageImg}
                      />
                    ) : (
                      <div className={styles.imagePlaceholder} />
                    )}
                  </div>
                  <div className={styles.itemInfo}>
                    <Text view="p-16" weight="medium">
                      {item.name}
                    </Text>
                    <Text view="p-14" color="secondary">
                      Quantity: {item.quantity}
                    </Text>
                  </div>
                  <div className={styles.itemPrice}>
                    <Text view="p-16" weight="medium">
                      {item.price.toFixed(2)} ₽
                    </Text>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.orderActions}>
              <button type="button" className={styles.actionButton}>
                Track Order
              </button>
              <button type="button" className={styles.actionButton}>
                Reorder
              </button>
              <button
                type="button"
                className={styles.actionButtonDelete}
                onClick={() => handleRemoveOrder(order.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
