import type { Product } from 'api/types';
import { LocalStorageModel } from 'store/LocalStorageModel';

const STORAGE_PREFIX = 'comparison_props_';

export type ProductExtendedProps = {
  material?: string;
  year?: string;
  company?: string;
  model?: string;
  warranty?: string;
  deliveryTime?: string;
};

const MATERIALS = ['Натуральная кожа', 'Пластик', 'Металл', 'Дерево', 'Стекло', 'Текстиль', 'Алюминий', 'Сталь'];
const COMPANIES = ['Lalasia', 'HomeStyle', 'ModernLiving', 'EliteHome', 'TechHome', 'BestFurniture'];
const MODELS = ['LX-2000', 'Pro-Series', 'Classic', 'Ultra', 'Premium', 'Standard', 'Deluxe'];
const WARRANTY = ['6 месяцев', '1 год', '2 года', '3 года', '5 лет'];
const DELIVERY = ['1–3 дня', '3–5 дней', '5–7 дней', '7–14 дней', 'до 21 дня'];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomProps(): ProductExtendedProps {
  return {
    material: pickRandom(MATERIALS),
    year: String(2020 + Math.floor(Math.random() * 5)),
    company: pickRandom(COMPANIES),
    model: `${pickRandom(MODELS)}-${String(Math.floor(Math.random() * 999)).padStart(3, '0')}`,
    warranty: pickRandom(WARRANTY),
    deliveryTime: pickRandom(DELIVERY),
  };
}

export function getProductExtendedProps(product: Product): ProductExtendedProps {
  const key = `${STORAGE_PREFIX}${product.documentId}`;
  const stored = LocalStorageModel.getItemJson<ProductExtendedProps | null>(key, null);
  if (stored && typeof stored === 'object') {
    return stored;
  }
  const props = generateRandomProps();
  LocalStorageModel.setItemJson(key, props);
  return props;
}
