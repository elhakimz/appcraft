import { useNode } from '@craftjs/core';
import { FormControl, InputLabel, Button } from '@mui/material';
import React from 'react';
import OptionsDialog from 'components/dialogs/OptionsDialog';

export type ToolbarOptionsDialogProps = {
  label: string;
  value: any;
  propKey?: string;
  onChange?: (value: any) => any;
  optionsData: Array<{ value: string; label: string }>;
};

export const ToolbarOptionsDialog = ({
  propKey,
  label,
  onChange = () => {}, // Default to a no-op function
  value,
  optionsData,
  ...props
}: ToolbarOptionsDialogProps) => {
  const {
    actions: { setProp },
  } = useNode((node) => ({
    propValue: node.data.props[propKey],
  }));

  const [internalValue, setInternalValue] = React.useState(value);
  const [options, setOptions] = React.useState(optionsData);
  const [optionsDialogOpen, setOptionsDialogOpen] = React.useState(false);

  const handleSave = (newOptions) => {
    console.log('newOptions=>', newOptions);
    setOptions(newOptions);
    setProp((props) => {
      props[propKey] = newOptions; // Update the options prop
    });

    // Check if onChange is a function before calling it
    if (typeof onChange === 'function') {
      onChange(newOptions);
    } else {
      console.warn('onChange prop is not a function');
    }

    setOptionsDialogOpen(false);
  };

  return (
    <div>
      <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
        <InputLabel sx={{ position: 'relative', transform: 'none' }}>{label}</InputLabel>
        <div>{internalValue}</div>
        <Button onClick={() => setOptionsDialogOpen(true)} size="small" variant="outlined">
          ...
        </Button>
      </FormControl>
      <OptionsDialog
        open={optionsDialogOpen}
        onClose={() => setOptionsDialogOpen(false)}
        onSave={handleSave}
        options={options}
      />
    </div>
  );
};