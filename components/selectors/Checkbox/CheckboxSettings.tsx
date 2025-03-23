import React from 'react';
import {renderSettings} from "../../../utils/propertyRendererUtil";
import {Checkbox} from "./index";


export const CheckboxSettings = () => {
  return (
    <>
        {renderSettings(Checkbox)}
    </>
  );
};