import React from 'react';
import cn from 'classnames';
import styles from 'components/Button/Button.module.scss';
import Loader from 'components/Loader';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  loading,
  disabled,
  onClick,
  ...rest
}) => {
  const isDisabled = Boolean(disabled || loading);

  const classNames = cn(
    styles.textButton,
    styles.button,
    { [styles.buttonLoading]: loading },
    className
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (loading || disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    onClick?.(event);
  };

  return (
    <button {...rest} disabled={isDisabled} onClick={handleClick} className={classNames}>
      {loading && <Loader className={styles.loaderWhite} size="s" />}
      {children}
    </button>
  );
};

export default Button;
