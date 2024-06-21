import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Home } from "./routes/home";
import { AllTasks } from "./routes/all-tasks";
import { ActiveTasks } from "./routes/active-tasks";
import { CompletedTasks } from "./routes/completed-tasks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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

export function App() { 
  return <RouterProvider router={router} />
}