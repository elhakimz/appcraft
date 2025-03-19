import React from 'react';
import { ToolbarSection, ToolbarItem } from '../../editor';

export const SelectSettings = () => {
  return (
    <>
      <ToolbarSection title="Select" props={['label', 'variant', 'color', 'size', 'fullWidth', 'disabled']}>
        <ToolbarItem
          type="text"
          label="Label"
          propKey="label"
        />
        <ToolbarItem
          type="select"
          label="Variant"
          propKey="variant"
          options={['standard', 'outlined', 'filled']}
        />
        <ToolbarItem
          type="select"
          label="Color"
          propKey="color"
          options={['primary', 'secondary', 'error', 'info', 'success', 'warning']}
        />
        <ToolbarItem
          type="select"
          label="Size"
          propKey="size"
          options={['small', 'medium']}
        />
        <ToolbarItem
          type="checkbox"
          label="Full Width"
          propKey="fullWidth"
        />
        <ToolbarItem
          type="checkbox"
          label="Disabled"
          propKey="disabled"
        />
      </ToolbarSection>
      <ToolbarSection title="Margin" props={['margin']}>
        <ToolbarItem
          type="text"
          label="Margin"
          propKey="margin"
          index={0}
        />
      </ToolbarSection>
    </>
  );
};