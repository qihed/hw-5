import * as React from 'react';
import cn from 'classnames';
import type { IconProps } from 'components/icons/Icon';
import styles from 'components/icons/Icon/Icon.module.scss';

const ArrowDownIcon: React.FC<IconProps> = ({
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
      className={cn(styles.icon, color && COLOR_STYLE_MAP[color], className)}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ArrowDownIcon;
