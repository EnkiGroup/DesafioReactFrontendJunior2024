import React from "react";
import ReactDOM from "react-dom";
import { Route, Routes } from "react-router";
import App from "./app";
import { TodoContextProvider } from "./contexts/TodoContext";
import reportWebVitals from "./reportWebVitals";
import { HashRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <TodoContextProvider>
      <HashRouter>
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>
      </HashRouter>
    </TodoContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
