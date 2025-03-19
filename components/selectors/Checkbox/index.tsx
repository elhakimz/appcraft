import { UserComponent, useNode } from '@craftjs/core';
import { Checkbox as MuiCheckbox, FormControlLabel } from '@mui/material';
import React from 'react';

import { CheckboxSettings } from './CheckboxSettings.tsx';

type CheckboxProps = {
  checked?: boolean;
  color?: 'primary' | 'secondary' | 'default' | 'error' | 'info' | 'success' | 'warning';
  disabled?: boolean;
  label?: string;
  size?: 'small' | 'medium';
  margin?: any[];
};

export const Checkbox: UserComponent<CheckboxProps> = ({
  checked,
  color,
  disabled,
  label,
  size,
  margin,
}: CheckboxProps) => {
  const {
    connectors: { connect },
  } = useNode((node) => ({
    selected: node.events.selected,
  }));

  return (
    <div
      ref={(dom) => connect(dom)}
      style={{
        margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`,
      }}
    >
      <FormControlLabel
        control={
          <MuiCheckbox
            checked={checked}
            color={color}
            disabled={disabled}
            size={size}
          />
        }
        label={label}
      />
    </div>
  );
};

Checkbox.craft = {
  displayName: 'Checkbox',
  props: {
    checked: false,
    color: 'primary',
    disabled: false,
    label: 'Checkbox',
    size: 'medium',
    margin: ['0', '0', '0', '0'],
  },
  related: {
    toolbar: CheckboxSettings,
  },
};