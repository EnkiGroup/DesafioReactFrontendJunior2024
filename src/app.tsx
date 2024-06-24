import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header"
import Input from "./components/Input"
import TodoList from "./components/TodoList";
import TodosContextProvider from "./store/todos-context";

export default function App() {

  return (
    <TodosContextProvider>
      <BrowserRouter>
      <div className="block bg-white-1 min-h-screen h-full">

        <Header />
        <div className="flex justify-center items-top w-full">

          <div className="max-w-[550px] w-5/6 min-w-[500px]">
            <Input />
            <Routes>
              <Route path="/" element={<TodoList />}></Route>
              <Route path="/active" element={<TodoList />}></Route>
              <Route path="/completed" element={<TodoList />}></Route>
            </Routes>
          </div>
        </div>
      </div>
      </BrowserRouter>
    </TodosContextProvider>
  );
}
