import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app.css";
import Header from "./Components/Header/Header";
import Input from "./Components/Input/Input";
import Tarefa from "./Components/Tarefa/Tarefa";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <div className="content">
          <Input />
          <Routes>
            <Route path="/" element={<Tarefa />} />
            <Route path="/active" element={<Tarefa filter="active" />} />
            <Route path="/completed" element={<Tarefa filter="completed" />} />
          </Routes>
        </div>
      </div>
      <div className="rodape">
     <p>Double-click to edit a todo</p>
     <p>Created by the TodoMVC Team</p>
     <p>Part of TodoMVC</p>
      </div>
    </BrowserRouter>
  );
}

export default App;
