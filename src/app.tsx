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
          <div className="flex justify-center items-top w-full relative">

            <div id="square" className="flex justify-center top-5 absolute z-0 rounded-[60px] bg-gray-4 w-[540px]">
              
              <div id="container" className="relative bottom-1 z-50 max-w-[550px] w-5/6 min-w-[500px]">
                <Input />
                <Routes>
                  <Route path="/" element={<TodoList />}></Route>
                  <Route path="/active" element={<TodoList />}></Route>
                  <Route path="/completed" element={<TodoList />}></Route>
                </Routes>
                <div className="flex bg-gray-2 opacity-90 h-9 w-full rounded-b-[80px] relative bottom-6 -z-10"></div>
              </div>


            </div>

          </div>


        </div>
      </BrowserRouter>
    </TodosContextProvider>
  );
}
