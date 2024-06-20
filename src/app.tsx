import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import TaskInput from "./components/TaskInput/taskInput";
import TaskList from "./components/TaskList/taskList";
import TaskStatusFilter from "./components/TaskStatusFilter/taskStatusFilter";
import "./styles/scss/styles.scss";
import { Task, TaskStatus } from "./types/types";
import { useQuery } from "@tanstack/react-query";

export default function App() {

  const todoUrl = "https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos"

  const { data: todoTasks } = useQuery({
    queryKey: ['todo'],
    queryFn: () => fetch(todoUrl).then((res) => res.json())
  })

  useEffect(() =>{
    console.log(todoTasks)
  }, [todoTasks])

  const [newTask, setNewTask] = useState<Task>({
    title: "",
    status: TaskStatus.Active
  })

  const [todoList, setTodoList] = useState<Task[]>([])
  
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && newTask.title !== "") {
      console.log('Enter pressionado, valor do input:', newTask);
      setTodoList([...todoList, newTask]);
      setNewTask({ ...newTask, title: "" });
    }
  }

  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask({ ...newTask, title: e.target.value });
  }

  const removeTask = (index: number) => {
    console.log('remover task: ' + index)
    setTodoList(todoList.filter((_, idx) => idx !== index))
  }

  const handleTaskStatus = (index: number) => {
    const updatedTasks = [...todoList];
    updatedTasks[index].status = updatedTasks[index].status === TaskStatus.Active ? TaskStatus.Completed : TaskStatus.Active;
    setTodoList(updatedTasks);
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <section className="main_container_app">
            <h1 id="main_title">Todos</h1>
            <main id="main_container_table">
              <div id="table_header">
                <div>
                  <span>Seta</span>
                </div>
                <TaskInput
                  newTask={newTask}
                  setNewTask={setNewTask}
                  handleKeyDown={handleKeyDown}
                  handleChange={handleChange}
                />
              </div>
              <TaskList todoList={todoList} handleTaskStatus={handleTaskStatus} removeTask={removeTask} />
              {todoList.length > 0 && <TaskStatusFilter taskCount={todoList.length} /> } 
            </main>
            <div>
              Descrição do projeto
            </div>
          </section>
        }/>
        <Route path="/active" element={null} />
        <Route path="/completed" element={null} />
      </Routes>
    </Router>

    
    
  );
}
