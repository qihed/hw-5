import type * as React from 'react';
import cn from 'classnames';
import styles from 'icons/Icon/Icon.module.scss';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
};

const COLOR_STYLE_MAP: Record<NonNullable<IconProps['color']>, string> = {
  primary: styles.iconPrimary,
  secondary: styles.iconSecondary,
  accent: styles.iconAccent,
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  children,
  className,
  color,
  ...rest
}) => {
  if (!children) return null;
  return (
    <svg
      {...rest}
      className={cn(styles.icon, color && COLOR_STYLE_MAP[color], className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
};

export default Icon;
