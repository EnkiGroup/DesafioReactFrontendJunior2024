import { Outlet } from "react-router-dom"

import { TasksInput } from "../components/tasks-input"
import { TasksFooter } from "../components/tasks-footer"

export function Home() {
  return (
    <div className="h-screen flex flex-col gap-8 bg-[#F5F5F5]">
      <header className="flex items-center justify-center pt-6">
        <h1 className="text-7xl text-red-700">todos</h1>
      </header>
      <main className="flex justify-center ">
        <section className="w-[550px] h-min bg-white custom-shadow">
          <TasksInput />
          <Outlet />
          <TasksFooter />
        </section>
      </main>
      <footer>
        <ul className="flex flex-col gap-2 text-center text-sm text-neutral-400">
          <li>
            Double-click to edit a todo
          </li>
          <li>
            Template by <strong className="text-neutral-600 hover:underline">Sindre Sorhus</strong>
          </li>
          <li>
            Created by <strong className="text-neutral-600 hover:underline">Chau Tran</strong>
          </li>
          <li>
            Utilized <strong className="text-neutral-600 hover:underline">XState</strong> by <strong className="text-neutral-600 hover:underline">David K</strong>
          </li>
          <li>
            Part of <strong className="text-neutral-600 hover:underline">TodoMVC</strong>
          </li>
        </ul>
      </footer>
    </div>
  )
}






