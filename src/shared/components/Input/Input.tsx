import React from 'react';
import cn from 'classnames';
import styles from 'components/Input/Input.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  value: string;
  onChange: (value: string) => void;
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, className, ...rest }, ref) => {
    return (
      <div className={cn(styles.inputWrapper, className)}>
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...rest}
          className={styles.input}
        />
        {afterSlot && <div className={styles.inputAfterSlot}>{afterSlot}</div>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
