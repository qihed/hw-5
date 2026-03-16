'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/src/store/StoreContext';
import { createDropZoneHandlers, DRAGGABLE_PRODUCT_ATTR } from 'lib/dragDrop';
import { getProductImageUrl, getProductCategoryName, DEFAULT_PRODUCT_IMAGE } from 'api/products';
import { getProductExtendedProps } from 'lib/productExtendedProps';
import { ProductPropsPopover } from 'components/ComparisonWidget/ProductPropsPopover';
import type { Product } from 'api/types';
import styles from 'components/ComparisonWidget/ComparisonWidget.module.scss';

function getComparisonTitle(products: Product[]): string {
  if (products.length === 0) return 'Сравнение';
  const props = getProductExtendedProps(products[0]);
  return props.company ? `Сравнение с ${props.company}` : 'Сравнение';
}

export type ComparisonWidgetProps = {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
};

const ComparisonWidget = ({ isOpen, onClose, triggerRef }: ComparisonWidgetProps) => {
  const { comparison } = useStore();
  const panelRef = useRef<HTMLDivElement>(null);

  const dropHandlers = createDropZoneHandlers<Product>(
    (product) => comparison.addProduct(product),
    ['product']
  );

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (triggerRef?.current?.contains(target)) return;
      if (target.closest?.(`[${DRAGGABLE_PRODUCT_ATTR}]`)) return;
      if (panelRef.current && !panelRef.current.contains(target)) {
        onClose();
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.backdrop} aria-hidden />
      <div
        ref={panelRef}
        className={styles.panel}
      role="dialog"
      aria-label="Сравнение товаров"
    >
        <div className={styles.header}>
          <h2 className={styles.title}>{getComparisonTitle(comparison.products)}</h2>
        </div>

        <div
          className={styles.dropZone}
          {...dropHandlers}
        >
          <span className={styles.dropHint}>
            Перетащите товар сюда
          </span>
          <span className={styles.dropSub}>
            или кликните на карточку и перетащите
          </span>
        </div>

        <div className={styles.list}>
          {comparison.products.length === 0 ? (
            <p className={styles.empty}>Нет товаров для сравнения</p>
          ) : (
            comparison.products.map((product) => (
              <ComparisonItem
                key={product.documentId}
                product={product}
                onRemove={() => comparison.removeProduct(product.documentId)}
              />
            ))
          )}
        </div>

        {comparison.products.length > 0 && (
          <button
            type="button"
            className={styles.clearBtn}
            onClick={() => comparison.clear()}
          >
            Очистить сравнение
          </button>
        )}
      </div>
    </>
  );
};

const ComparisonItem = ({
  product,
  onRemove,
}: {
  product: Product;
  onRemove: () => void;
}) => {
  const [showProps, setShowProps] = useState(false);
  const imageUrl = getProductImageUrl(product) || DEFAULT_PRODUCT_IMAGE;
  const category = getProductCategoryName(product);
  const extendedProps = getProductExtendedProps(product);

  if (showProps) {
    return (
      <div className={styles.itemExpanded}>
        <div className={styles.itemExpandedContent}>
          <Link
            href={`/products/${product.documentId}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.itemImageFull}>
              <Image
                src={imageUrl}
                alt={product.title}
                fill
                sizes="320px"
              />
            </div>
          </Link>
          <div className={styles.itemInfoRow}>
            <Link
              href={`/products/${product.documentId}`}
              style={{ textDecoration: 'none', color: 'inherit', flex: 1, minWidth: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.itemInfoBlock}>
                {category && <span className={styles.itemCategory}>{category}</span>}
                <span className={styles.itemTitle}>{product.title}</span>
                <span className={styles.itemPrice}>{product.price}₽</span>
              </div>
            </Link>
            <button
              type="button"
              className={styles.removeBtn}
              onClick={onRemove}
              aria-label="Удалить из сравнения"
            >
              ×
            </button>
          </div>
          <ProductPropsPopover
            props={extendedProps}
            onClose={() => setShowProps(false)}
            block
          />
          <div className={styles.itemExpandedActions}>
            <button
              type="button"
              className={styles.characteristicsBtn}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowProps(false);
              }}
            >
              Свернуть
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.item}>
      <div className={styles.itemLink}>
        <div className={styles.itemImage}>
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            sizes="80px"
          />
        </div>
        <div className={styles.itemInfo}>
          <Link
            href={`/products/${product.documentId}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
            onClick={(e) => e.stopPropagation()}
          >
            {category && <span className={styles.itemCategory}>{category}</span>}
            <span className={styles.itemTitle}>{product.title}</span>
            <span className={styles.itemPrice}>{product.price}₽</span>
          </Link>
          <button
            type="button"
            className={styles.characteristicsBtn}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowProps(true);
            }}
          >
            Характеристики
          </button>
        </div>
      </div>
      <button
        type="button"
        className={styles.removeBtn}
        onClick={onRemove}
        aria-label="Удалить из сравнения"
      >
        ×
      </button>
    </div>
  );
};

export default observer(ComparisonWidget);
