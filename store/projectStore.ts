import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Page = {
  id: string;
  name: string;
  description:string; 
  content: string; // Craft.js JSON content
};

export type App = {
  id: string;
  name: string;
  description:string;
  pages: Page[];
};

export type Project = {
  id: string;
  name: string;
  description?: string;
  app: App; // One App per project
};

export type ProjectState = {
  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (id: string, updatedProject: Project) => void;
  deleteProject: (id: string) => void;
  addPageToApp: (projectId: string, newPage: Page) => void; // Add page to the App
  updatePage: (projectId: string, appId: string, pageId: string, updates: Partial<Page>) => void;
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
      // Add a page to the App within a project
      addPageToApp: (projectId:string, newPage) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === projectId
              ? {
                  ...project,
                  app: {
                    ...project.app,
                    pages: [...project.app.pages, newPage], // Add the new page to the App
                  },
                }
              : project
          ),
        })),
      updatePage: (projectId:string, appId, pageId, updates) => {
        set((state) => ({
          projects: state.projects.map(project => {
            if (project.id === projectId) {
              return {
                ...project,
                app: {
                  ...project.app,
                  pages: project.app.pages.map(page => 
                    page.id === pageId 
                      ? { ...page, ...updates }
                      : page
                  )
                }
              };
            }
            return project;
          })
        }));
      },
    }),
    {
      name: 'appcraft-projects', // unique name for localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Helper function to create a new project with a base structure
export const createNewProject = (name: string, description?: string): Project => {
  return {
    id: `project_${Date.now()}`, // Generate a unique ID
    name,
    description,
    app: {
      id: 'app_1',
      name: 'App',
      description: 'An app',
      pages: [
        {
          id: 'page_1',
          name: 'Home',
          description: 'Home Page',
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
  };
};
