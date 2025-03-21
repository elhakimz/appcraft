import React from 'react';
import {renderSettings} from "../../../utils/propertyRendererUtil";
import {data} from './settings'
import {Select} from "./index";

export const SelectSettings = () => {
  return (
    <>
      {renderSettings(Select)}
    </>
  );
};