import React from "react";
import { Header } from "./components/header/header";
import TodoL from "./components/Todo/todo";


export default function App() {
  return (
    <section>
      <Header />
      <div>
        <TodoL />
      </div>
    </section>
  );
}
