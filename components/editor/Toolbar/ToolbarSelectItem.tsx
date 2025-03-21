import { MenuItem } from '@mui/material';
import React from 'react';

export const ToolbarSelectItem = ({ value, label, index }: any) => {
  return (
    <MenuItem key={index} value={value}> {label} </MenuItem>
  );
};