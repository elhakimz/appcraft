import { UserComponent, useNode } from '@craftjs/core';
import { Select as MuiSelect, MenuItem, FormControl, InputLabel } from '@mui/material';
import React from 'react';

import { SelectSettings } from './SelectSettings';

type SelectProps = {
  label?: string;
  value?: string;
  options?: Array<{ value: string; label: string }>;
  variant?: 'standard' | 'outlined' | 'filled';
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  size?: 'small' | 'medium';
  fullWidth?: boolean;
  disabled?: boolean;
  margin?: any[];
};

export const Select: UserComponent<SelectProps> = ({
  label,
  value,
  options,
  variant,
  color,
  size,
  fullWidth,
  disabled,
  margin,
}: SelectProps) => {
  const {
    connectors: { connect },
  } = useNode((node) => ({
    selected: node.events.selected,
  }));

  const [selectedValue, setSelectedValue] = React.useState(value);

  return (
    <div
      ref={(dom) => connect(dom)}
      style={{
        margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`,
      }}
    >
      <FormControl fullWidth={fullWidth} size={size} disabled={disabled}>
        <InputLabel>{label}</InputLabel>
        <MuiSelect
          value={selectedValue}
          label={label}
          onChange={(e) => setSelectedValue(e.target.value)}
          variant={variant}
          color={color}
        >
          {options?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </MuiSelect>
      </FormControl>
    </div>
  );
};

Select.craft = {
  displayName: 'Select',
  props: {
    label: 'Select',
    value: '',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    variant: 'outlined',
    color: 'primary',
    size: 'medium',
    fullWidth: true,
    disabled: false,
    margin: ['0', '0', '0', '0'],
  },
  related: {
    toolbar: SelectSettings,
  },
};