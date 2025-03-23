import { useNode } from '@craftjs/core';
import {Grid2 as Grid, Slider, RadioGroup, FormGroup, TextField, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox, InputAdornment, IconButton} from '@mui/material';
import * as React from 'react';

import { ToolbarDropdown } from './ToolbarDropdown';
import { ToolbarTextInput } from './ToolbarTextInput';
import { ToolbarRadio } from './ToolbarRadio';
import { ToolbarSelectItem } from './ToolbarSelectItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIcons } from '@fortawesome/free-solid-svg-icons';
import IconSelectorDialog from 'components/dialogs/IconSelectorDialog';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import EditorDialog from 'components/dialogs/EditorDialog';

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
  
  // State for managing the dialog
  const [dialogOpen, setDialogOpen] = React.useState(false);

  // State for managing the current value of the code editor
  const [currentValue, setCurrentValue] = React.useState(value || '');

  // Handle icon selection
  const handleIconSelect = (iconName) => {
    setProp((props) => {
      if (Array.isArray(propValue)) {
        props[propKey][index] = iconName;
      } else {
        props[propKey] = iconName;
      }
    }, 500);
  };

  const handleCodeChange = (code) => {
    setProp((props) => {
      if (Array.isArray(propValue)) {
        props[propKey][index] = code;
      } else {
        props[propKey] = code;
      }
    }, 500);
    setDialogOpen(false);
  };



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
        )  : type === 'icon' ? (
          <>
            <TextField
              fullWidth
              style={{maxWidth:'400px', minWidth:'200px'}}
              value={value || ''}
              InputProps={{
                readOnly: true, // Make the input read-only
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setDialogOpen(true)}>
                      <FontAwesomeIcon icon={faIcons} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <IconSelectorDialog
              open={dialogOpen}
              onClose={() => setDialogOpen(false)}
              onSelect={handleIconSelect}
            />
          </>
        ) 
          : (type==='code-js' || type==='code-ts' || type==='code-json' || type==='code-object')? (
          <>
            {props.label ? (
              <h4 className="text-sm text-light-gray-2">{props.label}</h4>
            ) : null}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <TextField
                fullWidth
                style={{ maxWidth: '400px', minWidth: '200px' }}
                value={currentValue}
                multiline
                rows={3}
                InputProps={{
                  readOnly: true,
                }}
                size='small'
              />
              <IconButton
                onClick={() => setDialogOpen(true)}
                sx={{
                  mt: '4px',
                  bgcolor: 'action.selected',
                  '&:hover': { bgcolor: 'action.focus' },
                }}
                size='small'
              >
                <FontAwesomeIcon icon={faCode} />
              </IconButton>
            </div>
            <EditorDialog
              open={dialogOpen}
              onClose={() => setDialogOpen(false)}
              onSave={(newValue) => {
                setCurrentValue(newValue);
                handleCodeChange(newValue)
                // setCurrentValue(newValue); // Update the local state
                // setProp((props: any) => {
                //   if (Array.isArray(propValue)) {
                //     props[propKey][index] = onChange ? onChange(newValue) : newValue;
                //   } else {
                //     props[propKey] = onChange ? onChange(newValue) : newValue;
                //   }
                // }, 500);
                // setDialogOpen(false);
              }}
              initialValue={currentValue}
              language={type === 'code-js' ? 'javascript' : type === 'code-ts' ? 'typescript' : 'json'}
              title={`Edit ${props.label || 'Code'}`}
            />
          </>
        )  : null}
      </div>
    </Grid>
  );
};
