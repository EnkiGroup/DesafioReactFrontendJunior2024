import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { TasksProvider } from './contexts/tasks-context.tsx'

import { App } from './App.tsx'
import { AllTasks } from "./routes/all-tasks";
import { ActiveTasks } from "./routes/active-tasks";
import { CompletedTasks } from "./routes/completed-tasks";

import "./index.css"

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <AllTasks />
      },
      {
        path: "/active",
        element: <ActiveTasks />
      },
      {
        path: "/completed",
        element: <CompletedTasks />
      }
    ]
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <TasksProvider>
        <RouterProvider router={router} />
      </TasksProvider>
    </QueryClientProvider>
  </StrictMode>,
)
