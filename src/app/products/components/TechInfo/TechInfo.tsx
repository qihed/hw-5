'use client';

import { useState, useEffect } from 'react';
import Input from 'components/Input';
import Button from 'components/Button';
import SearchIcon from 'icons/SearchIcon';
import FilterIcon from 'icons/FilterIcon';
import styles from './TechInfo.module.scss';
import MultiDropdown, { type Option } from 'components/MultiDropdown';
import Text from 'components/Text';
import { useStore } from 'store/StoreContext';

export type CategoryOption = { key: string; value: string };

export type TechInfoProps = {
  total?: number;
  loading?: boolean;
  searchValue?: string;
  onSearchSubmit?: (value: string) => void;
  selectedCategoryIds?: number[];
  onCategoryChange?: (ids: number[]) => void;
  onClearSearch?: () => void;
  onClearCategory?: () => void;
  priceMin?: number;
  priceMax?: number;
  onPriceChange?: (min: number | undefined, max: number | undefined) => void;
  onClearPrice?: () => void;
  /** Если передан — используется вместо catalog.categoryOptions (для серверного рендера каталога) */
  categoryOptions?: CategoryOption[];
};

const TechInfo = ({
  total = 0,
  loading = false,
  searchValue = '',
  onSearchSubmit,
  selectedCategoryIds = [],
  onCategoryChange,
  onClearSearch,
  onClearCategory,
  priceMin,
  priceMax,
  onPriceChange,
  onClearPrice,
  categoryOptions: categoryOptionsProp,
}: TechInfoProps) => {
  const { catalog } = useStore();
  const categoryOptions =
    categoryOptionsProp?.length !== undefined
      ? categoryOptionsProp
      : catalog.categoryOptions;
  const selectedCategoryOptions = categoryOptions.filter((opt) =>
    selectedCategoryIds.includes(parseInt(opt.key, 10))
  );

  const [searchQuery, setSearchQuery] = useState(searchValue);
  const [localPriceMin, setLocalPriceMin] = useState<string>(priceMin != null ? String(priceMin) : '');
  const [localPriceMax, setLocalPriceMax] = useState<string>(priceMax != null ? String(priceMax) : '');

  useEffect(() => {
    setSearchQuery(searchValue);
  }, [searchValue]);

  useEffect(() => {
    setLocalPriceMin(priceMin != null ? String(priceMin) : '');
    setLocalPriceMax(priceMax != null ? String(priceMax) : '');
  }, [priceMin, priceMax]);

  const handleSubmit = () => {
    onSearchSubmit?.(searchQuery);
  };

  const handleCategoryChange = (options: Option[]) => {
    onCategoryChange?.(options.map((o) => parseInt(o.key, 10)));
  };

  const hasSearch = Boolean(searchValue.trim());
  const hasCategoryFilter = Boolean(selectedCategoryIds.length);
  const hasPriceFilter = priceMin != null || priceMax != null;

  const handleApplyPrice = () => {
    const min = localPriceMin.trim() ? parseInt(localPriceMin.trim(), 10) : undefined;
    const max = localPriceMax.trim() ? parseInt(localPriceMax.trim(), 10) : undefined;
    onPriceChange?.(
      min != null && !Number.isNaN(min) && min >= 0 ? min : undefined,
      max != null && !Number.isNaN(max) && max >= 0 ? max : undefined
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.fieldSearch}>
        <Input
          value={searchQuery}
          placeholder="Search product"
          className={styles.input}
          onChange={setSearchQuery}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          beforeSlot={<SearchIcon color="secondary" width={20} height={20} />}
        />
        <Button type="button" onClick={handleSubmit}>
          Find now
        </Button>
        {hasSearch && onClearSearch && (
          <Button type="button" onClick={onClearSearch} className={styles.clearSearchBtn}>
            Clear
          </Button>
        )}
      </div>
      <div className={styles.filtersRow}>
        <span className={styles.filterIconWrap} aria-hidden>
          <FilterIcon color="secondary" width={20} height={20} />
        </span>
        <MultiDropdown
          className={styles.dropdown}
          options={categoryOptions}
          value={selectedCategoryOptions}
          onChange={handleCategoryChange}
          getTitle={(value) =>
            value.length ? value.map((option) => option.value).join(', ') : 'Filter'
          }
        />
        {hasCategoryFilter && onClearCategory && (
          <Button type="button" onClick={onClearCategory} className={styles.clearBtn}>
            Clear
          </Button>
        )}
        <div className={styles.priceFilter}>
          <Input
            type="number"
            min={0}
            value={localPriceMin}
            onChange={setLocalPriceMin}
            placeholder="Price from"
            className={styles.priceInput}
          />
          <Input
            type="number"
            min={0}
            value={localPriceMax}
            onChange={setLocalPriceMax}
            placeholder="Price to"
            className={styles.priceInput}
          />
          <Button type="button" onClick={handleApplyPrice}>
            Apply
          </Button>
          {hasPriceFilter && onClearPrice && (
            <Button type="button" onClick={onClearPrice} className={styles.clearBtn}>
              Clear price
            </Button>
          )}
        </div>
      </div>
      <div className={styles.numFrame}>
        <Text className={styles.text}>Total products</Text>
        <Text className={styles.textNum} view="p-20">
          {loading ? '…' : total}
        </Text>
      </div>
    </div>
  );
};

export default TechInfo;
