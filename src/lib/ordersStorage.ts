export type OrderItem = {
  name: string;
  quantity: number;
  price: number;
  image: string;
};

export type OrderStatus = 'delivered' | 'in_transit' | 'processing';

export type Order = {
  id: number;
  status: OrderStatus;
  statusLabel: string;
  date: string;
  total: number;
  items: OrderItem[];
};

const STORAGE_KEY = 'orders';

export function readOrdersFromStorage(): Order[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function writeOrdersToStorage(orders: Order[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch {
    return;
  }
}

export function appendOrderToStorage(order: Order): void {
  const current = readOrdersFromStorage();
  writeOrdersToStorage([...current, order]);
}

/** Удаляет заказ из localStorage по id */
export function removeOrderFromStorage(orderId: number): void {
  const current = readOrdersFromStorage();
  writeOrdersToStorage(current.filter((o) => o.id !== orderId));
}

export type CreateOrderItemInput = {
  name: string;
  quantity: number;
  price: number;
  image: string;
};

/** Создаёт и сохраняет заказ из одного или нескольких товаров */
export function createOrderFromItems(items: CreateOrderItemInput[]): Order {
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const existing = readOrdersFromStorage();
  const nextId = existing.length > 0 ? Math.max(...existing.map((o) => o.id)) + 1 : 1;
  const order: Order = {
    id: nextId,
    status: 'processing',
    statusLabel: 'Processing',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    total,
    items,
  };
  appendOrderToStorage(order);
  return order;
}
