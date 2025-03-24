import { useRouter } from 'next/router';
import { Box, Typography, Drawer, List, ListItem, ListItemText, Collapse, Button, IconButton } from '@mui/material';
import { Editor, Frame, Element } from '@craftjs/core';
import { Container, Text } from '../../components/selectors';
import { Page, useProjectStore } from '../../store/projectStore';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, ExpandLess, ExpandMore, Home } from '@mui/icons-material'; // Import the Home icon

const ProjectPage = () => {
  const router = useRouter();
  const { projectId } = router.query; // Get the projectId from the URL

  // Ensure projectId is a string
  const projectIdString = Array.isArray(projectId) ? projectId[0] : projectId;

  const { projects, addPageToApp } = useProjectStore(); // Add `addPageToApp` to the store actions

  // Find the project by ID
  const project = projects.find((p) => p.id === projectIdString);

  if (!project || !project.app) {
    return (
      <Box sx={{ padding: '20px' }}>
        <Typography variant="h4">Loading project...</Typography>
      </Box>
    );
  }

  if (!project) {
    return (
      <Box sx={{ padding: '20px' }}>
        <Typography variant="h4">Project not found.</Typography>
      </Box>
    );
  }

  // State for the currently selected app and page
  const [selectedApp, setSelectedApp] = useState(project?.app || null);
  const [selectedPage, setSelectedPage] = useState(project?.app?.pages?.[0] || {
    id: 'default',
    name: 'Default Page',
    content: JSON.stringify({}),
    description: ''
  });
  const [openAppId, setOpenAppId] = useState(project?.app?.id || null);

  // Handle app click to toggle collapse
  const handleAppClick = (app) => {
    setOpenAppId(openAppId === app.id ? null : app.id);
    setSelectedApp(app);
  };

  // Handle page selection
  const handlePageClick = (page: Page) => {
    setSelectedPage(page);
  };

  // Handle creating a new page
  const handleCreatePage = (appId: string) => {
    const newPage: Page = {
      id: `page-${Date.now()}`, // Generate a unique ID for the new page
      name: `New Page`, // Default name for the new page
      content: JSON.stringify({}),
      description: ''
    };
addPageToApp(projectIdString, newPage); // Add the new page to the app
    setSelectedPage(newPage); // Set the new page as the selected page
  };

  // Handle navigation to the home page
  const handleNavigateHome = () => {
    router.push('/'); // Navigate to the root/home page
  };

  // Add this state near other state declarations
  const [drawerOpen, setDrawerOpen] = useState(true);
  
  // Replace the existing toggleDrawer function with this implementation
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar for App and Page List */}
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
                onClick={() => router.push(`/projects/${project.id}/apps/${project.app.id}`)}
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': {
                    color: 'primary.main',
                  }
                }}
              >
                Apps
              </Typography>
          <List>
            <div key={project.app.id}>
              <ListItem
                button
                onClick={() => handleAppClick(project.app)}
                sx={{
                  marginBottom: '5px',
                  borderRadius: '4px',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                <ListItemText primary={project.app.name} />
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/projects/${project.id}/apps/${project.app.id}`);
                  }}
                  sx={{ mr: 1 }}
                >
                  <ChevronRight />
                </IconButton>
                {openAppId === project.app.id ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openAppId === project.app.id} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {project.app.pages.map((page) => (
                    <ListItem
                      key={page.id}
                      button
                      onClick={() => handlePageClick(page)}
                      selected={page.id === selectedPage.id}
                      sx={{
                        pl: 4,
                        marginBottom: '5px',
                        borderRadius: '4px',
                        '&.Mui-selected': {
                          backgroundColor: '#e0e0e0',
                        },
                        '&:hover': {
                          backgroundColor: '#f5f5f5',
                        },
                      }}
                    >
                      <ListItemText primary={page.name} />
                    </ListItem>
                  ))}
                  <Button
                    fullWidth
                    variant="text"
                    onClick={() => handleCreatePage(project.app.id)}
                    sx={{
                      pl: 4,
                      justifyContent: 'flex-start',
                      textTransform: 'none',
                      color: 'primary.main',
                      '&:hover': {
                        backgroundColor: '#f5f5f5',
                      },
                    }}
                  >
                    [+ Create Page]
                  </Button>
                </List>
              </Collapse>
            </div>
          </List>
        </Box>
      </Drawer>

      {/* Add this button for collapsed state */}
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
          {project.name}
        </Typography>
        <Typography variant="body1">
          {project.description || 'No description provided.'}
        </Typography>

      </Box>
    </Box>
  );
};

export default ProjectPage;