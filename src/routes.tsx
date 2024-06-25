import { createBrowserRouter, Navigate } from "react-router-dom";
import TodosPage from "./pages/TodosPage";

export const routes = createBrowserRouter(
  [
    {
      path: "/",
      element: <Navigate to="/all" replace />,
    },
    {
      path: "/:filter",
      element: <TodosPage />,
    },
  ],
  {
    basename: "/",
  }
);
