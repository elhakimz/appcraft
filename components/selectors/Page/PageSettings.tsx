import React from 'react';
import { ToolbarSection, ToolbarItem } from '../../editor';

export const PageSettings = () => {
  return (
    <>
      <ToolbarSection
        title="Dimensions"
        props={['width', 'height']}
      >
        <ToolbarItem
          type="text"
          label="Width"
          propKey="width"
          index={0}
        />
        <ToolbarItem
          type="text"
          label="Height"
          propKey="height"
          index={0}
        />
      </ToolbarSection>
      <ToolbarSection
        title="Padding"
        props={['padding']}
      >
        <ToolbarItem
          type="text"
          label="Padding"
          propKey="padding"
          index={0}
        />
      </ToolbarSection>
      <ToolbarSection
        title="Variables"
        props={['variables']}
      >
        <ToolbarItem
          type="text"
          label="Variables"
          propKey="variables"
          index={0}
        />
      </ToolbarSection>
    </>
  );
};