import ContentLoader from 'react-content-loader';
import styles from './product-details.module.scss';

const BACKGROUND_COLOR = '#fafafa';
const FOREGROUND_COLOR = '#518581';

const ProductDetailsSkeleton = () => {
  return (
    <div className={styles.container} aria-busy="true" aria-label="Загрузка товара">
      <div className={styles.imgItem} style={{ minHeight: 280 }}>
        <ContentLoader
          speed={4}
          width="100%"
          height="100%"
          viewBox="0 0 600 600"
          preserveAspectRatio="xMidYMid meet"
          backgroundColor={BACKGROUND_COLOR}
          foregroundColor={FOREGROUND_COLOR}
        >
          <rect x="0" y="0" width="600" height="600" />
        </ContentLoader>
      </div>

      <div className={styles.info}>
        <div className={styles.text}>
          <ContentLoader
            speed={4}
            width="100%"
            height={140}
            viewBox="0 0 640 140"
            preserveAspectRatio="xMinYMin meet"
            backgroundColor={BACKGROUND_COLOR}
            foregroundColor={FOREGROUND_COLOR}
          >
            <rect x="0" y="8" width="360" height="28" rx="6" />
            <rect x="0" y="56" width="620" height="16" rx="6" />
            <rect x="0" y="80" width="600" height="16" rx="6" />
            <rect x="0" y="104" width="560" height="16" rx="6" />
          </ContentLoader>
        </div>

        <div className={styles.action}>
          <ContentLoader
            speed={4}
            width="100%"
            height={140}
            viewBox="0 0 640 140"
            preserveAspectRatio="xMinYMin meet"
            backgroundColor={BACKGROUND_COLOR}
            foregroundColor={FOREGROUND_COLOR}
          >
            <rect x="0" y="0" width="140" height="32" rx="6" />
            <rect x="0" y="64" width="200" height="52" rx="10" />
            <rect x="224" y="64" width="220" height="52" rx="10" />
          </ContentLoader>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
