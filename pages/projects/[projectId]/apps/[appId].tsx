import { useRouter } from 'next/router';
import { Box, Typography, Drawer, List, ListItem, ListItemText, Button, IconButton } from '@mui/material';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Home } from '@mui/icons-material';
import { useProjectStore } from '../../../../store/projectStore';
import { Grid, Card, CardContent, CardActions } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { Edit } from '@mui/icons-material';

const AppPage = () => {
  const router = useRouter();
  const { projectId, appId } = router.query;
  const [drawerOpen, setDrawerOpen] = useState(true);
  // Add these new states
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingPage, setEditingPage] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', description: '' });

  // Add these new handlers
  const handleEditClick = (e, page) => {
    e.stopPropagation();
    setEditingPage(page);
    setEditFormData({
      name: page.name,
      description: page.description || ''
    });
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
    setEditingPage(null);
    setEditFormData({ name: '', description: '' });
  };

  const handleEditSave = () => {
    if (editingPage) {
      // TODO: Implement the update logic with your project store
      // updatePage(editingPage.id, editFormData);
    }
    handleEditClose();
  };

  // Ensure IDs are strings
  const projectIdString = Array.isArray(projectId) ? projectId[0] : projectId;
  const appIdString = Array.isArray(appId) ? appId[0] : appId;

  const { projects } = useProjectStore();
  const project = projects.find((p) => p.id === projectIdString);
  const app = project?.app;


  if (!project || !app) {
    return (
      <Box sx={{ padding: '20px' }}>
        <Typography variant="h4">Loading app...</Typography>
      </Box>
    );
  }

  // Handle navigation to the home page
  const handleNavigateHome = () => {
    router.push('/');
  };

  // Handle navigation to project page
  const handleNavigateToProject = () => {
    router.push(`/projects/${projectId}`);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerOpen ? 240 : 0,
          flexShrink: 0,
          transition: 'width 0.2s',
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            transform: drawerOpen ? 'none' : 'translateX(-100%)',
            transition: 'transform 0.2s',
          },
        }}
      >
        <Box sx={{ padding: '20px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <Button
              variant="text"
              onClick={handleNavigateHome}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                textTransform: 'none',
                color: 'primary.main',
                flexGrow: 1,
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              <Home sx={{ marginRight: '8px' }} />
              <Typography variant="h6">AppCraft</Typography>
            </Button>
            <IconButton onClick={toggleDrawer}>
              {drawerOpen ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
          </Box>

          <Typography 
            variant="h6" 
            gutterBottom 
            onClick={handleNavigateToProject}
            sx={{ 
              cursor: 'pointer',
              '&:hover': {
                color: 'primary.main',
              }
            }}
          >
            {project.name}
          </Typography>

          <List>
            <ListItem
              sx={{
                marginBottom: '5px',
                borderRadius: '4px',
                backgroundColor: '#e0e0e0',
              }}
            >
              <ListItemText 
                primary={app.name}
                secondary="App Settings"
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Collapsed state button */}
      {!drawerOpen && (
        <IconButton
          onClick={toggleDrawer}
          sx={{
            position: 'absolute',
            left: 0,
            top: 20,
            backgroundColor: 'background.paper',
            borderRadius: '0 4px 4px 0',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          <ChevronRight />
        </IconButton>
      )}

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, padding: '20px', overflow: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          {app.name}
        </Typography>
        
        {/* Pages Grid */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Pages
          </Typography>
          <Grid container spacing={3}>
            {app.pages.map((page) => (
              <Grid item xs={12} sm={6} md={4} key={page.id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    '&:hover': { 
                      boxShadow: 6,
                      transform: 'translateY(-4px)',
                      transition: 'all 0.3s ease-in-out'
                    }
                  }}
                  onClick={() => router.push(`/projects/${projectId}/pages/${page.id}`)}
                >
                  <Box
                    sx={{
                      p: 2,
                      background: `hsl(${(parseInt(page.id.split('-')[1]) * 137.5) % 360}deg, 70%, 85%)`,
                      borderTopLeftRadius: 'inherit',
                      borderTopRightRadius: 'inherit',
                    }}
                  >
                    <Typography variant="h6" component="h2">
                      {page.name}
                    </Typography>
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {page.description || 'No description'}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'flex-end', p: 2, gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={(e) => handleEditClick(e, page)}
                      sx={{ mr: 1 }}
                    >
                      <Edit />
                    </IconButton>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/projects/${projectId}/apps/${project.app.id}/pages/${page.id}`);
                      }}
                    >
                      Open
                    </Button>
                  </CardActions>
                </Card>

      {/* Add this Dialog component at the end of the main Box */}
      <Dialog open={editDialogOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Page</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Page Name"
            fullWidth
            variant="outlined"
            value={editFormData.name}
            onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={editFormData.description}
            onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* App Settings */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            App Settings
          </Typography>
          {/* Add app settings form components here */}
        </Box>
      </Box>
    </Box>
  );
};

export default AppPage;