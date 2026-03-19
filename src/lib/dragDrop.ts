import type { DragEvent } from 'react';

export const DRAG_DATA_KEY = 'application/json';

/** data-атрибут для draggable-карточки товара (виджет не закрывается при клике по ней) */
export const DRAGGABLE_PRODUCT_ATTR = 'data-draggable-product';

export type DragPayload<T = unknown> = {
  type: string;
  data: T;
};

export function createDraggableHandlers<T>(
  payload: T,
  dragType = 'product'
): {
  draggable: true;
  onDragStart: (e: React.DragEvent) => void;
} {
  return {
    draggable: true,
    onDragStart(e: DragEvent) {
      const data: DragPayload<T> = { type: dragType, data: payload };
      e.dataTransfer.setData(DRAG_DATA_KEY, JSON.stringify(data));
      e.dataTransfer.effectAllowed = 'copy';
    },
  };
}

export function createDropZoneHandlers<T>(
  onDrop: (data: T) => void,
  acceptedTypes: string[] = ['product']
): {
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
} {
  return {
    onDragOver(e: DragEvent) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    },
    onDrop(e: DragEvent) {
      e.preventDefault();
      const raw = e.dataTransfer.getData(DRAG_DATA_KEY);
      if (!raw) return;
      try {
        const parsed = JSON.parse(raw) as DragPayload<T>;
        if (acceptedTypes.includes(parsed.type)) {
          onDrop(parsed.data);
        }
      } catch {
        return;
      }
    },
  };
}
