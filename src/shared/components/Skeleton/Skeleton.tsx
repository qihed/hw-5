import type { ComponentProps } from 'react';
import ContentLoader from 'react-content-loader';
import styles from 'components/Skeleton/Skeleton.module.scss';

type SkeletonProps = ComponentProps<typeof ContentLoader>;

const VIEWBOX = '0 0 348 558';
const BACKGROUND_COLOR = '#fafafa';
const FOREGROUND_COLOR = '#518581';

const RECTS = (
  <>
    <rect x="0" y="0" width="348" height="348" />
    <rect x="12" y="368" width="80" height="14" rx="2" />
    <rect x="12" y="390" width="200" height="20" rx="2" />
    <rect x="12" y="418" width="324" height="16" rx="2" />
    <rect x="12" y="442" width="300" height="16" rx="2" />
    <rect x="12" y="466" width="280" height="16" rx="2" />
    <rect x="12" y="506" width="60" height="20" rx="2" />
    <rect x="276" y="496" width="60" height="42" rx="4" />
  </>
);

const Skeleton = (props: SkeletonProps) => (
  <div className={styles.container}>
    <div className={styles.skeletonCard}>
      <ContentLoader
        speed={2}
        width="100%"
        height="100%"
        viewBox={VIEWBOX}
        preserveAspectRatio="xMidYMid meet"
        backgroundColor={BACKGROUND_COLOR}
        foregroundColor={FOREGROUND_COLOR}
        className={styles.skeletonSvg}
        {...props}
      >
        {RECTS}
      </ContentLoader>
    </div>
    <div className={styles.skeletonCard}>
      <ContentLoader
        speed={2}
        width="100%"
        height="100%"
        viewBox={VIEWBOX}
        preserveAspectRatio="xMidYMid meet"
        backgroundColor={BACKGROUND_COLOR}
        foregroundColor={FOREGROUND_COLOR}
        className={styles.skeletonSvg}
        {...props}
      >
        {RECTS}
      </ContentLoader>
    </div>
    <div className={styles.skeletonCard}>
      <ContentLoader
        speed={2}
        width="100%"
        height="100%"
        viewBox={VIEWBOX}
        preserveAspectRatio="xMidYMid meet"
        backgroundColor={BACKGROUND_COLOR}
        foregroundColor={FOREGROUND_COLOR}
        className={styles.skeletonSvg}
        {...props}
      >
        {RECTS}
      </ContentLoader>
    </div>
  </div>
);

export default Skeleton;
