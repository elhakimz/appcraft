import { useNode } from '@craftjs/core';
import {Grid2 as Grid, Slider, RadioGroup, FormGroup, TextField, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox} from '@mui/material';
import * as React from 'react';

import { ToolbarDropdown } from './ToolbarDropdown';
import { ToolbarTextInput } from './ToolbarTextInput';
import { ToolbarRadio } from './ToolbarRadio';
import { ToolbarSelectItem } from './ToolbarSelectItem';

export type ToolbarItemProps = {
  prefix?: string;
  label?: string;
  full?: boolean;
  propKey?: string;
  index?: number;
  children?: React.ReactNode;
  type: string;
  onChange?: (value: any) => any;
  optionsData?:[]
  hasOptions?:boolean
  multiline?:false| any
};
export const ToolbarItem = ({
  full = false,
  propKey,
  type,
  onChange,
  index,
  multiline,
  optionsData,
  hasOptions=false,
  ...props
}: ToolbarItemProps) => {

  
  const {
    actions: { setProp },
    propValue,
    node, // Add this line
  } = useNode((node) => ({
    propValue: node.data.props[propKey],
    node, // Include the node in the return object
  }));

  
  const value = Array.isArray(propValue) ? propValue[index] : propValue;
  const options = hasOptions ? node.data.props.options:  []; // Access the options prop

  React.useEffect(() => {
    console.log("Options data has changed:", optionsData);
  }, [optionsData]);
  

  return (
    <Grid size={{ xs: full ? 12 : 6 }}>
      <div className="mb-2">
        {['text', 'color', 'bg', 'number'].includes(type) ? (
          <ToolbarTextInput
            {...props}
            type={type}
            value={value}
            multiline={multiline}
            onChange={(value) => {
              setProp((props: any) => {
                if (Array.isArray(propValue)) {
                  props[propKey][index] = onChange ? onChange(value) : value;
                } else {
                  props[propKey] = onChange ? onChange(value) : value;
                }
              }, 500);
            }}
          />
        ) : type === 'slider' ? (
          <>
            {props.label ? (
              <h4 className="text-sm text-light-gray-2">{props.label}</h4>
            ) : null}
            <Slider
              sx={{
                color: '#3880ff',
                height: 2,
                padding: '5px 0',
                width: '100%',
                '& .MuiSlider-track': {
                  height: 2,
                },
                '& .MuiSlider-thumb': {
                  height: 12,
                  width: 12,
                },
              }}
              value={parseInt(value) || 0}
              onChange={
                ((_, value: number) => {
                  setProp((props: any) => {
                    if (Array.isArray(propValue)) {
                      props[propKey][index] = onChange
                        ? onChange(value)
                        : value;
                    } else {
                      props[propKey] = onChange ? onChange(value) : value;
                    }
                  }, 1000);
                }) as any
              }
            />
          </>
        ) : type === 'sizer' ? (
            <>
              {props.label ? (
                  <h4 className="text-sm text-light-gray-2">{props.label}</h4>
              ) : null}
              <Slider
                  sx={{
                    color: '#3880ff',
                    height: 2,
                    padding: '5px 0',
                    width: '100%',
                    '& .MuiSlider-track': {
                      height: 2,
                    },
                    '& .MuiSlider-thumb': {
                      height: 12,
                      width: 12,
                    },
                  }}
                  value={parseInt(value) || 0}
                  onChange={
                    ((_, value: number) => {
                      setProp((props: any) => {
                          props[propKey] = onChange ? onChange(value) : value;
                      }, 1000);
                    }) as any
                  }
              />
            </>
        ) : type === 'radio' ? (
          <>
            {props.label ? (
              <h4 className="text-sm text-light-gray-2">{props.label}</h4>
            ) : null}
            <RadioGroup
              value={value || ''}
              onChange={(e) => {
                const newValue = e.target.value;
                setProp((props: any) => {
                  props[propKey] = newValue; // Update the value prop
                }, 500); // Debounce time
              }}
            >
             {hasOptions ? options.map((option, index) => (
                <ToolbarRadio
                  key={index}
                  value={option.value}
                  label={option.label}
                />
              )):props.children}

            </RadioGroup>
          </>
        ) :  type === 'checkbox' ? (
          <>
            {props.label ? (
              <h4 className="text-sm text-light-gray-2">{props.label}</h4>
            ) : null}
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!value} // Convert value to boolean
                  onChange={(e) => {
                    const newValue = e.target.checked;
                    setProp((props: any) => {
                      props[propKey] = onChange ? onChange(newValue) : newValue;
                    }, 500);
                  }}
                />
              }
              label={props.label}
            />
          </>
        ) : type === 'select' ? (
          <>
            {props.label ? (
              <h4 className="text-sm text-light-gray-2">{props.label}</h4>
            ) : null}
            <FormControl fullWidth style={{maxWidth:'400px', minWidth:'200px'}} size="small">
              <InputLabel>{props.label}</InputLabel>
              <Select
                value={value || ''}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setProp((props: any) => {
                    props[propKey] = onChange ? onChange(newValue) : newValue;
                  }, 500);
                }}
              >
                {hasOptions ? options.map((option, index) => (
                  <MenuItem key={index} value={option.value}>
                    {option.label}
                  </MenuItem>
                )): props.children}
              </Select>
            </FormControl>
          </>
        )  : null}
      </div>
    </Grid>
  );
};
