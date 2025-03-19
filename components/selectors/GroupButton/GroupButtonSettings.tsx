import React from 'react';

import { ToolbarSection, ToolbarItem } from '../../editor';
import { ToolbarRadio } from '../../editor/Toolbar/ToolbarRadio';
import {renderSettings} from "../../../utils/propertyRendererUtil";
import {data} from './settings'

export const GroupButtonSettings = () => {
  return (
    <React.Fragment>
        {renderSettings(data)}
    </React.Fragment>
  );
};
