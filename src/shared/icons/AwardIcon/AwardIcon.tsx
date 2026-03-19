import * as React from 'react';
import cn from 'classnames';
import type { IconProps } from 'icons/Icon';
import styles from 'icons/Icon/Icon.module.scss';

const AwardIcon: React.FC<IconProps> = ({
  className,
  color,
  width = 24,
  height = 24,
  ...rest
}) => {
  const COLOR_STYLE_MAP: Record<NonNullable<IconProps['color']>, string> = {
    primary: styles.iconPrimary,
    secondary: styles.iconSecondary,
    accent: styles.iconAccent,
  };

  return (
    <svg
      {...rest}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(styles.icon, color && COLOR_STYLE_MAP[color], className)}
    >
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  );
};

export default AwardIcon;
