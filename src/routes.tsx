import { App } from "./app";

import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <App />,
  },
]);
