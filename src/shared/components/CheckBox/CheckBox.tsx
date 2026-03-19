import React from 'react';
import cn from 'classnames';
import CheckIcon from 'icons/CheckIcon';
import styles from 'components/CheckBox/CheckBox.module.scss';

export type CheckBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  onChange: (checked: boolean) => void;
  size?: number;
};

const CheckBox: React.FC<CheckBoxProps> = ({ onChange, className, checked, disabled, size = 40, ...rest }) => {
  const sizeStyle = { width: size, height: size } as React.CSSProperties;

  return (
    <label className={styles.checkboxWrap} style={sizeStyle}>
      <input
        {...rest}
        type="checkbox"
        className={cn(styles.checkbox, className)}
        checked={Boolean(checked)}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
      />
      {Boolean(checked) && (
        <CheckIcon
          className={cn(styles.checkboxIcon, { [styles.checkboxIconDisabled]: disabled })}
          width={size}
          height={size}
        />
      )}
    </label>
  );
};

export default CheckBox;
