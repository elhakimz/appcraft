import { Editor, Frame, Element } from '@craftjs/core';
import { createTheme,ThemeProvider } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { Viewport, RenderNode } from 'components/editor';
import { Container, Text , GroupButton, ToggleButtonGroup, Slider, Switch, TransferList, Card, Avatar} from '../../../../../..//components/selectors';
import { Button } from 'components/selectors/Button';
import { Custom1, OnlyButtons } from 'components/selectors/Custom1';
import { Custom2, Custom2VideoDrop } from 'components/selectors/Custom2';
import { Custom3, Custom3BtnDrop } from 'components/selectors/Custom3';
import { Video } from 'components/selectors/Video';
import { Checkbox } from 'components/selectors/Checkbox';
import { Select } from 'components/selectors/Select';
import { GroupRadio } from 'components/selectors/GroupRadio';
import {Rating} from 'components/selectors'
import { Box, Typography, Drawer, List, ListItem, ListItemText, Button as MuiButton , IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight, Home } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useProjectStore } from 'store/projectStore';


const theme = createTheme({
  typography: {
    fontFamily: [
      'acumin-pro',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function PageEditor() {
  const router = useRouter();
  const { projectId, appId, pageId } = router.query;
  const { projects, updatePage } = useProjectStore();
  const [editorState, setEditorState] = useState(null);
  
  // Get the current page data
  const project = projects.find(p => p.id === projectId);
  const page = project?.app?.pages?.find(p => p.id === pageId);
  const [drawerOpen, setDrawerOpen] = useState(true);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const default_template = JSON.stringify({
    ROOT: {
      type: { resolvedName: 'Container' },
      isCanvas: true,
      props: {
        width: '800px',
        height: 'auto',
        background: { r: 255, g: 255, b: 255, a: 1 },
        padding: ['40', '40', '40', '40'],
        custom: { displayName: 'Page' },
         displayName: 'Page'
      }
    }
  })

  // Add this effect to handle navigation
  useEffect(() => {
    // Skip if any of the IDs are arrays or undefined
    if (!projectId || !appId || !pageId || 
        Array.isArray(projectId) || Array.isArray(appId) || Array.isArray(pageId)) {
      return;
    }

    const handleRouteChange = (url) => {
      if (editorState && page) {
        const json = editorState.toJSON();
        updatePage(projectId, appId, pageId, { content: json });
      }
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      // Also save when component unmounts
      if (editorState && page) {
        const json = editorState.toJSON();
        updatePage(projectId, appId, pageId, { content: json });
      }
    };
  }, [editorState, page, projectId, appId, pageId, updatePage]);

  return (
    <ThemeProvider theme={theme}>
      <div className="h-full h-screen">
        {/* Add Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            width: drawerOpen ? 240 : 0,
            flexShrink: 0,
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
              <MuiButton
                variant="text"
                onClick={() => router.push('/')}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'primary.main',
                  flexGrow: 1,
                }}
              >
                <Home sx={{ marginRight: '8px' }} />
                <Typography variant="h6">AppCraft</Typography>
              </MuiButton>
              <IconButton onClick={toggleDrawer}>
                <ChevronLeft />
              </IconButton>
            </Box>

            <List>
              <ListItem
                button
                onClick={() => router.push(`/projects/${projectId}/apps/${appId}`)}
                sx={{
                  marginBottom: '5px',
                  borderRadius: '4px',
                }}
              >
                <ListItemText primary="App" />
                <IconButton size="small">
                  <ChevronLeft />
                </IconButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
        <IconButton 
            onClick={toggleDrawer}
            sx={{
                position: 'absolute',
                left: '80px',
                top: '5px',
                zIndex: 1000,
            }}
        >
            <ChevronRight />
        </IconButton>
        <Editor
          resolver={{
            Container, Text, GroupButton,Custom1,Custom2,Custom2VideoDrop,
            Custom3,Custom3BtnDrop,
            OnlyButtons,
            Button,
            Checkbox,
            Select,
            Video,
            GroupRadio,
            Rating,
            ToggleButtonGroup,
            Slider,
            Switch,
            TransferList,
            Card, Avatar
          }}
          enabled={true}
          onRender={RenderNode}
        >
          <Viewport>
            <Frame json={page?.content || default_template}>
              {/* <Element
                canvas
                is={Container}
                width="800px"
                height="auto"
                background={{ r: 255, g: 255, b: 255, a: 1 }}
                padding={['40', '40', '40', '40']}
                custom={{ displayName: 'Page' }}
              /> */}
            </Frame>
          </Viewport>
        </Editor>
      </div>
    </ThemeProvider>
  );
}

export default PageEditor;
