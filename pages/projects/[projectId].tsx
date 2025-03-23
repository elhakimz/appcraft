import { useRouter } from 'next/router';
import { Box, Typography, Drawer, List, ListItem, ListItemText, Collapse, Button } from '@mui/material';
import { Editor, Frame, Element } from '@craftjs/core';
import { Container, Text } from '../../components/selectors';
import { Page, useProjectStore } from '../../store/projectStore';
import { useState } from 'react';
import { ExpandLess, ExpandMore, Home } from '@mui/icons-material'; // Import the Home icon

const ProjectPage = () => {
  const router = useRouter();
  const { projectId } = router.query; // Get the projectId from the URL

  // Ensure projectId is a string
  const projectIdString = Array.isArray(projectId) ? projectId[0] : projectId;

  const { projects, addPageToApp } = useProjectStore(); // Add `addPageToApp` to the store actions

  // Find the project by ID
  const project = projects.find((p) => p.id === projectIdString);

  if (!project) {
    return (
      <Box sx={{ padding: '20px' }}>
        <Typography variant="h4">Project not found.</Typography>
      </Box>
    );
  }

  // State for the currently selected app and page
  const [selectedApp, setSelectedApp] = useState(project.apps[0]);
  const [selectedPage, setSelectedPage] = useState(project.apps[0].pages[0]);
  const [openAppId, setOpenAppId] = useState(project.apps[0].id);

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
      content: JSON.stringify({}), // Default empty content as a JSON string
    };
    addPageToApp(projectIdString, appId, newPage); // Add the new page to the app
    setSelectedPage(newPage); // Set the new page as the selected page
  };

  // Handle navigation to the home page
  const handleNavigateHome = () => {
    router.push('/'); // Navigate to the root/home page
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar for App and Page List */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
      >
        <Box sx={{ padding: '20px' }}>
          {/* Add the [AppCraft] button with a home icon */}
          <Button
            fullWidth
            variant="text"
            onClick={handleNavigateHome}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              textTransform: 'none',
              color: 'primary.main',
              marginBottom: '20px',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            <Home sx={{ marginRight: '8px' }} /> {/* Home icon */}
            <Typography variant="h6">AppCraft</Typography>
          </Button>

          <Typography variant="h6" gutterBottom>
            Apps
          </Typography>
          <List>
            {project.apps.map((app) => (
              <div key={app.id}>
                <ListItem
                  button
                  onClick={() => handleAppClick(app)}
                  sx={{
                    marginBottom: '5px',
                    borderRadius: '4px',
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                    },
                  }}
                >
                  <ListItemText primary={app.name} />
                  {openAppId === app.id ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openAppId === app.id} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {app.pages.map((page) => (
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
                    {/* Add a button to create a new page */}
                    <Button
                      fullWidth
                      variant="text"
                      onClick={() => handleCreatePage(app.id)}
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
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, padding: '20px', overflow: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          {project.name}
        </Typography>
        <Typography variant="body1">
          {project.description || 'No description provided.'}
        </Typography>

        {/* Render the selected page content using Craft.js */}
        <Editor resolver={{ Container, Text }}>
          <Frame json={selectedPage.content}>
            <Element canvas is={Container} custom={{ displayName: 'App' }}>
              {/* Render the page content here */}
            </Element>
          </Frame>
        </Editor>
      </Box>
    </Box>
  );
};

export default ProjectPage;