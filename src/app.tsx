import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header"
import Input from "./components/Input"
import TodoList from "./components/TodoList";
import TodosContextProvider from "./store/todos-context";
import Footer from "./components/Footer";

export default function App() {

  return (
    <TodosContextProvider>
      <BrowserRouter>

        <div className="bg-white-1 h-full min-h-screen">
          <Header />
          <main className="h-auto relative w-full">
            <div className="flex justify-center">
              <div className="flex justify-center top-5 relative z-0 rounded-[60px] bg-gray-4 w-[540px]">
                <div className="max-w-[550px] min-w-[500px]">
                  <Input />
                  <Routes>
                    <Route path="/" element={<TodoList />}></Route>
                    <Route path="/active" element={<TodoList />}></Route>
                    <Route path="/completed" element={<TodoList />}></Route>
                  </Routes>
                  <div className="flex bg-gray-2 opacity-90 h-9 w-auto rounded-b-[80px] relative bottom-6 -z-10"></div>
                </div>
              </div>
            </div>
          </main>

          <Footer />

        </div>







      </BrowserRouter>
    </TodosContextProvider>
  );
}
