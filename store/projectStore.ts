import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Page = {
  id: string;
  name: string;
  description:string; 
  content: string; // Craft.js JSON content
};

type App = {
  id: string;
  name: string;
  description:string;
  pages: Page[];
};

export type Project = {
  id: string;
  name: string;
  description?: string;
  apps: App[];
};

type ProjectState = {
  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (id: string, updatedProject: Project) => void;
  deleteProject: (id: string) => void;
  addPageToApp: (projectId: string, appId: string, newPage: Page) => void; // New action
};

export const useProjectStore = create<ProjectState>()(
  persist(
    (set) => ({
      projects: [],
      addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
      updateProject: (id, updatedProject) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id ? updatedProject : project
          ),
        })),
      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id),
        })),
      // New action to add a page to an app
      addPageToApp: (projectId, appId, newPage) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === projectId
              ? {
                  ...project,
                  apps: project.apps.map((app) =>
                    app.id === appId
                      ? { ...app, pages: [...app.pages, newPage] } // Add the new page to the app
                      : app
                  ),
                }
              : project
          ),
        })),
    }),
    {
      name: 'project-storage', // Unique name for local storage key
      getStorage: () => localStorage, // Use localStorage for persistence
    }
  )
);

// Helper function to create a new project with a base structure
export const createNewProject = (name: string, description?: string): Project => {
  return {
    id: `project_${Date.now()}`, // Generate a unique ID
    name,
    description,
    apps: [
      {
        id: 'app_1',
        name: 'App',
        description:'An app',
        pages: [
          {
            id: 'page_1',
            name: 'Home',
            description:'Home Page',
            content: JSON.stringify({
              // Craft.js JSON structure for the page
              ROOT: {
                type: 'Container',
                props: {
                  width: '800px',
                  height: 'auto',
                  background: { r: 255, g: 255, b: 255, a: 1 },
                  padding: ['40', '40', '40', '40'],
                },
                nodes: [],
              },
            }),
          },
        ],
      },
    ],
  };
};