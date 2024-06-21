import { Outlet as TaskList } from "react-router-dom"

import { TasksInput } from "../components/tasks-header"
import { TasksFooter } from "../components/tasks-footer"

export function Home() {
  return (
    <div className="h-screen bg-[#F5F5F5]">
      <header className="flex items-center justify-center p-6">
        <h1 className="text-7xl text-red-700">todos</h1>
      </header>
      <main className="h-full flex justify-center ">
        <section className="w-[550px] h-min bg-white custom-shadow">
          <TasksInput />
          <TaskList />
          <TasksFooter />
        </section>
      </main>
    </div>
  )
}






