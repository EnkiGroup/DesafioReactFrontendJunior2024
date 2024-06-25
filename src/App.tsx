import { Outlet } from "react-router-dom"

import { TasksInput } from "./components/tasks-input"
import { TasksFooter } from "./components/tasks-footer"

export function App() {
  return (
    <div className="h-screen flex flex-col items-center bg-[#F5F5F5]">
      <header className="flex items-center justify-center p-6">
        <h1 className="text-7xl text-red-700">todos</h1>
      </header>
      <main className="w-min max-sm:w-full flex justify-center sm:circles-effect">
        <section className="w-[550px] h-min max-sm:w-full max-sm:mx-4 bg-white custom-shadow ">
          <TasksInput />
          <Outlet />
          <TasksFooter />
        </section>
      </main>
      <footer>
        <ul className="flex flex-col gap-2 mt-16 text-center text-sm text-neutral-400">
          <li>
            Double-click to edit a todo
          </li>
          <li>
            Template by <a href="https://github.com/EnkiGroup/DesafioReactFrontendJunior2024/tree/main?tab=readme-ov-file" className="text-neutral-600 hover:underline">Best Designer</a>
          </li>
          <li>
            Created by <a href="https://github.com/devenzonascimento" className="text-neutral-600 hover:underline">Enzo Nascimento</a>
          </li>
          <li>
            Utilized <a href="https://react.dev/" className="text-neutral-600 hover:underline">React</a> by <a href="https://opensource.fb.com/" className="text-neutral-600 hover:underline">Meta</a>
          </li>
          <li>
            Part of <a href="https://todomvc.com/" className="text-neutral-600 hover:underline">TodoMVC</a>
          </li>
        </ul>
      </footer>
    </div>
  )
}