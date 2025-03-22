import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  Grid, 
  Paper, 
  Typography,
  IconButton,
  TextField,
  InputAdornment
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-regular-svg-icons';
import SearchIcon from '@mui/icons-material/Search';

type IconSelectorDialogProps = {
  open: boolean;
  onClose: () => void;
  onSelect: (iconName: string) => void;
};

const IconSelectorDialog = ({ open, onClose, onSelect }: IconSelectorDialogProps) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const iconNames = Object.keys(icons).filter(key => key.startsWith('fa'));

  const filteredIcons = iconNames.filter(iconName => 
    iconName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleIconSelect = (iconName: string) => {
    onSelect(iconName);
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          height: '80vh',
        }
      }}
    >
      <DialogTitle>Select Icon</DialogTitle>
      <DialogContent sx={{ 
        padding: 2,
        overflow: 'hidden',
      }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search icons..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ marginBottom: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Grid 
          container 
          spacing={2} 
          sx={{ 
            height: 'calc(100% - 80px)', // Adjusted to account for search box
            overflow: 'auto',
            padding: 1,
          }}
        >
          {filteredIcons.map((iconName) => (
            <Grid item xs={3} sm={2} md={2} key={iconName}>
              <Paper
                elevation={2}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: 1,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                    transform: 'scale(1.05)',
                  },
                }}
                onClick={() => handleIconSelect(iconName)}
              >
                <IconButton size="large" sx={{ marginBottom: 1 }}>
                  <FontAwesomeIcon 
                    icon={icons[iconName]} 
                    style={{ fontSize: '1.5rem' }}
                  />
                </IconButton>
                <Typography 
                  variant="caption" 
                  align="center"
                  sx={{
                    width: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    fontSize: '0.7rem'
                  }}
                >
                  {iconName.replace('fa', '')}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default IconSelectorDialog;