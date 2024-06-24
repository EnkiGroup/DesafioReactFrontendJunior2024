import React from "react";
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import { Header } from "./components/header/header";
import Todo from "./components/Todo/todo";
import { Footer } from "./components/footer/foooter";


export default function App() {
  return (
    <Router>
      <section>
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<Todo filter="all" />} />
            <Route path="/active" element={<Todo filter="active" />} />
            <Route path="/completed" element={<Todo filter="completed" />} />
          </Routes>
        </div>
        <Footer />
      </section>
    </Router>
  );
}
