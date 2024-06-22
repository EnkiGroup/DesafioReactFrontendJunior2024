import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app.css";
import Header from "./Components/Header";
import Input from "./Components/Input";
import Tarefa from "./Components/Tarefa";

function App() {
  return (
    <BrowserRouter>
      <div>
        <div>
          <Header />
          <Input />
          <Routes>
            <Route path="/" element={<Tarefa />} />
            <Route path="/active" element={<Tarefa filter="active" />} />
            <Route path="/completed" element={<Tarefa filter="completed" />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
