import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "active",
    element: <Home />
  },
  {
    path: "completed",
    element: <Home />
  },
])

export function App() { 
  return <RouterProvider router={router} />
}