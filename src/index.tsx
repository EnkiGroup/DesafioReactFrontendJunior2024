import { StrictMode } from "react"
import { render } from "react-dom"
import "./styles/main.scss"
import { HashRouter, Route, Routes } from "react-router-dom"
import { TodoProvider } from "./context/TodoContext"
import App from "./view/app"

render(
  <StrictMode>
    <TodoProvider>
      <HashRouter>
        <Routes>
          <Route path='*' element={<App />} />
        </Routes>
      </HashRouter>
      ,
    </TodoProvider>
  </StrictMode>,
  document.getElementById("root")
)
