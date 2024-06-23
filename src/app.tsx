import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app.css";
import Header from "./Components/Header/Header";
import Input from "./Components/Input/Input";
import Tarefa from "./Components/Tarefa/Tarefa";
import FooterInfo from "./Components/Footer/Footer-info";

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
      <FooterInfo/>
    </BrowserRouter>
  );
}

export default App;
