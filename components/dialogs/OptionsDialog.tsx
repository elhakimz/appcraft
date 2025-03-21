import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, List, ListItem, ListItemText, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const OptionsDialog = ({ open, onClose, onSave, options }) => {
    const [newValue, setNewValue] = React.useState('');
    const [newLabel, setNewLabel] = React.useState('');
    const [optionsList, setOptionsList] = React.useState(options || []);

    const handleAddOption = () => {
        setOptionsList([...optionsList, { value: newValue, label: newLabel }]);
        setNewValue('');
        setNewLabel('');
    };

    const handleRemoveOption = (index) => {
        setOptionsList(optionsList.filter((_, i) => i !== index));
    };

    const handleSave = () => {
        onSave(optionsList);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Options dialog</DialogTitle>
            <DialogContent>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TextField label="Value" value={newValue} onChange={(e) => setNewValue(e.target.value)} />
                    <TextField label="Label" value={newLabel} onChange={(e) => setNewLabel(e.target.value)} />
                    <Button onClick={handleAddOption}>
                        <AddIcon />
                    </Button>
                </div>
                <List style={{ width: '100%' }}>
                    <ListItem>
                        <ListItemText 
                            primary="Value" 
                            style={{ flex: 1, fontWeight: 'bold' }} 
                        />
                        <ListItemText 
                            primary="Label" 
                            style={{ flex: 1, fontWeight: 'bold' }} 
                        />
                        <div style={{ width: 48 }} />
                    </ListItem>
                    {optionsList.map((option, index) => (
                        <ListItem 
                            key={index} 
                            sx={{ 
                                display: 'flex',
                                '&:hover': {
                                    bgcolor: 'action.hover'
                                }
                            }}
                        >
                            <ListItemText 
                                primary={option.value} 
                                style={{ flex: 1 }}
                            />
                            <ListItemText 
                                primary={option.label} 
                                style={{ flex: 1 }}
                            />
                            <IconButton onClick={() => handleRemoveOption(index)}>
                                <RemoveIcon />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default OptionsDialog;