import * as React from 'react';
import cn from 'classnames';
import type { IconProps } from 'components/icons/Icon';
import styles from 'components/icons/Icon/Icon.module.scss';

const CheckIcon: React.FC<IconProps> = ({ className, color, width = 24, height = 24, ...rest }) => {
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
      className={cn(styles.icon, color && COLOR_STYLE_MAP[color], className)}
    >
      <path d="M4 11.6129L9.87755 18L20 7" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
};

export default CheckIcon;
