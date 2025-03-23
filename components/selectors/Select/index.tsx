import { useNode } from '@craftjs/core';
import { Select as MuiSelect, MenuItem, FormControl, InputLabel } from '@mui/material';
import React from 'react';
import { registerElement, unregisterElement } from '../../../utils/elementRegistryUtils'// Import utility functions
import { SelectSettings } from './SelectSettings';

type SelectProps = {
  id?: string; // Add id prop
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

export const Select = ({
  id,
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
    actions: { setProp },
  } = useNode((node) => ({
    selected: node.events.selected,
    value: node.data.props.value,
  }));

  const [selectedValue, setSelectedValue] = React.useState(value);

  // Register the Select element and its attributes
  React.useEffect(() => {
    if (id) {
      // Register the element with the current id and value
      registerElement(id, { value: selectedValue });

      // Cleanup function to unregister the element when id changes or component unmounts
      return () => {
        unregisterElement(id);
      };
    }
  }, [id, selectedValue]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newValue = event.target.value as string;
    setSelectedValue(newValue);
    setProp((props) => (props.value = newValue)); // Update Craft.js node props
  };

  return (
    <div
      ref={(dom) => {
        connect(dom);
      }}
      style={{
        margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`,
      }}
    >
      <FormControl fullWidth={fullWidth} size={size} disabled={disabled} style={{ width: 'auto', minWidth: '200px' }}>
        <InputLabel>{label}</InputLabel>
        <MuiSelect
          value={selectedValue}
          label={label}
          onChange={handleChange}
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
    id: `select_${Math.random().toString(36).substr(2, 9)}`, // Generate a unique ID
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