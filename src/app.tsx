import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./styles/global.css";
import { routes } from "./routes";

const App = () => {
  return <RouterProvider router={routes} />;
};

export default App;
