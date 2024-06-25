import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import "./styles/global.css";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals(console.log);
