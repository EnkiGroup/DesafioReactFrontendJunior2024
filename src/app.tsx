import React from "react";
import Header from "./Componentes/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Componentes/Footer";
import Tarefas from "./Componentes/Tarefas/Tarefas";
import { TarefaStorage } from "./tarefaContext";
import TarefasCompletas from "./Componentes/Tarefas/TarefasCompletas";
import TarefasAtivas from "./Componentes/Tarefas/TarefasAtivas";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <TarefaStorage>
          <Header />
          <Routes>
            <Route path="/" element={<Tarefas />} />
            <Route path="/ativas" element={<TarefasAtivas />} />
            <Route path="/completas" element={<TarefasCompletas />} />
          </Routes>
          <Footer />
        </TarefaStorage>
      </BrowserRouter>
    </>
  );
}
