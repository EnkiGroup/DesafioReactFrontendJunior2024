import React from "react";
import './index.scss'
import ContainerToDo from "./components/organisms/ContainerToDo/ContainerToDo";
import Footer from "./components/organisms/Footer/Footer";


export default function App() {
  return (
    <section className="appContainer">
      <h1 className="appContainer__title">todos</h1>
      <ContainerToDo />
      <Footer />      
    </section>
  );
}
