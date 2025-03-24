import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from '@mui/material';
import { Project, useProjectStore, createNewProject } from '../store/projectStore';
import { 
  Grid,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CircularProgress } from '@mui/material';

const Home = () => {
  const router = useRouter();
  const { projects, addProject, updateProject, deleteProject } = useProjectStore();
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  // Handle opening the dialog for creating/editing a project
  const handleOpenDialog = (project: Project | null = null) => {
    if (project) {
      // Editing an existing project
      setEditingProject(project);
      setProjectName(project.name);
      setProjectDescription(project.description || '');
    } else {
      // Creating a new project
      setEditingProject(null);
      setProjectName('');
      setProjectDescription('');
    }
    setOpenDialog(true);
  };

  // Handle closing the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProject(null);
    setProjectName('');
    setProjectDescription('');
  };

  // Handle saving the project (create or update)
  const handleSaveProject = () => {
    if (editingProject) {
      // Update existing project
      updateProject(editingProject.id, {
        ...editingProject,
        name: projectName,
        description: projectDescription,
      });
    } else {
      // Create new project with base structure
      const newProject = createNewProject(projectName, projectDescription);
      addProject(newProject);
    }
    handleCloseDialog();
  };

  // Handle navigating to a project's details page
  // Add this state near other state declarations
  const [loadingProjectId, setLoadingProjectId] = useState<string | null>(null);
  
  // Update the handleProjectClick function
  const handleProjectClick = async (projectId: string) => {
    setLoadingProjectId(projectId);
    try {
      await router.push(`/projects/${projectId}`);
    } finally {
      setLoadingProjectId(null);
    }
  };
  
  
  return (
    <div className="h-full h-screen">

      {/* Project Management UI */}
      <Box sx={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          AppCraft
        </Typography>

        {/* Create Project Button */}
        <Button
          variant="contained"
          onClick={() => handleOpenDialog()}
          sx={{ marginBottom: '20px' }}
        >
          Create Project
        </Button>

        {/* List of Projects */}
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            {projects.map((project, index) => (
              <Grid item xs={12} sm={6} md={4} key={project.id}>
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
                  onClick={() => handleProjectClick(project.id)}
                  onDoubleClick={() => handleOpenDialog(project)}
                >
                  <Box
                    sx={{
                      p: 2,
                      background: `hsl(${(index * 137.5) % 360}deg, 70%, 85%)`,
                      borderTopLeftRadius: 'inherit',
                      borderTopRightRadius: 'inherit',
                    }}
                  >
                    <Typography variant="h6" component="h2" gutterBottom>
                      {project.name}
                    </Typography>
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {project.description || 'No description'}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'space-between', padding: 2 }}>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm('Are you sure you want to delete this project?')) {
                          deleteProject(project.id);
                        }
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </IconButton>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProjectClick(project.id);
                      }}
                      disabled={loadingProjectId === project.id}
                      sx={{ minWidth: '80px' }}
                    >
                      {loadingProjectId === project.id ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        'Open'
                      )}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Dialog for creating/editing a project */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editingProject ? 'Edit Project' : 'Create Project'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Project Name"
            fullWidth
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveProject} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;