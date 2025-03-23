import React from 'react';

import {renderSettings} from "../../../utils/propertyRendererUtil";
import {GroupButton} from "./index";

export const GroupButtonSettings = () => {
  return (
    <React.Fragment>
        {renderSettings(GroupButton)}
    </React.Fragment>
  );
};
