import React from 'react';
import { ToolbarSection, ToolbarItem } from '../../editor';
import {renderSettings} from "../../../utils/propertyRendererUtil";
import {data} from './settings'
import {Checkbox} from "./index";


export const CheckboxSettings = () => {
  return (
    <>
      {/*<ToolbarSection title="Checkbox" props={['checked', 'color', 'disabled', 'label', 'size']}>*/}
      {/*  <ToolbarItem*/}
      {/*    type="checkbox"*/}
      {/*    label="Checked"*/}
      {/*    propKey="checked"*/}
      {/*  />*/}
      {/*  <ToolbarItem*/}
      {/*    type="select"*/}
      {/*    label="Color"*/}
      {/*    propKey="color"*/}
      {/*    options={['primary', 'secondary', 'default', 'error', 'info', 'success', 'warning']}*/}
      {/*  />*/}
      {/*  <ToolbarItem*/}
      {/*    type="checkbox"*/}
      {/*    label="Disabled"*/}
      {/*    propKey="disabled"*/}
      {/*  />*/}
      {/*  <ToolbarItem*/}
      {/*    type="text"*/}
      {/*    label="Label"*/}
      {/*    propKey="label"*/}
      {/*  />*/}
      {/*  <ToolbarItem*/}
      {/*    type="select"*/}
      {/*    label="Size"*/}
      {/*    propKey="size"*/}
      {/*    options={['small', 'medium']}*/}
      {/*  />*/}
      {/*</ToolbarSection>*/}
      {/*<ToolbarSection title="Margin" props={['margin']}>*/}
      {/*  <ToolbarItem*/}
      {/*    type="text"*/}
      {/*    label="Margin"*/}
      {/*    propKey="margin"*/}
      {/*    index={0}*/}
      {/*  />*/}
      {/*</ToolbarSection>*/}
        {renderSettings(Checkbox)}
    </>
  );
};