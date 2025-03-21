import { FormControlLabel, Radio, Checkbox } from '@mui/material';
import React from 'react';

// Inspired by blueprintjs
function StyledCheckbox(props) {
    return (
        <Checkbox
            disableRipple
            color="default"
            size="small"
            sx={{
                '&.Mui-checked': {
                    color: 'rgb(19, 115, 230)',
                },
            }}
            {...props}
        />
    );
}

export const ToolbarCheckbox = ({ value, label }: any) => {
    return (
        <FormControlLabel value={value} control={<StyledCheckbox />} label={label} />
    );
};
