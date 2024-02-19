import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import reportWebVitals from "./reportWebVitals";
import TodoAPP from "./app";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot>
          <Routes>
            <Route path="/" element={<TodoAPP />} />
            <Route path="/active" element={<TodoAPP />} />
            <Route path="/completed" element={<TodoAPP />} />
            <Route path="*" element={"ERROR 404"} />
          </Routes>
        </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
