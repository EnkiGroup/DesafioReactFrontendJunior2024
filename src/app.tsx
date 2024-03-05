import React from "react";
import "./app.css";
import InputSection from "./Components/InputSection";
import { BrowserRouter } from "react-router-dom";
export default function App() {
  return (
    <BrowserRouter>
    <div className="flex flex-col min-h-screen font-helvetica font-light  bg-background">
      <section className="flex flex-col flex-grow w-full items-center">
        <header className="mt-7">
          <h1 className="text-todo text-7xl font-thin mb-10">todos</h1>
        </header>
        <InputSection />
      </section>
    </div>
    </BrowserRouter>
  );
}
