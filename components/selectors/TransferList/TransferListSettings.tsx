import React from 'react';
import { renderSettings } from "../../../utils/propertyRendererUtil";
import { TransferList } from "./index";

export const TransferListSettings = () => {
  return (
    <React.Fragment>
      {renderSettings(TransferList)}
    </React.Fragment>
  );
};