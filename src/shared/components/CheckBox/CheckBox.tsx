import React from 'react';
import cn from 'classnames';
import CheckIcon from 'components/icons/CheckIcon';
import styles from 'components/CheckBox/CheckBox.module.scss';

export type CheckBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({ onChange, className, checked, disabled, ...rest }) => {
  return (
    <label className={styles.checkboxWrap}>
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
          width={40}
          height={40}
        />
      )}
    </label>
  );
};

export default CheckBox;
