import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import "./styles/scss/styles.scss";

type Task = {
  title: string;
  status: TaskStatus;
};

enum TaskStatus {
  Active = "Ativo",
  Completed = "Completado"
}

export default function App() {

  const [newTask, setNewTask] = useState<Task>({
    title: "",
    status: TaskStatus.Active
  })

  const [taskList, setTaskList] = useState<Task[]>([])
  
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && newTask.title !== "") {
      console.log('Enter pressionado, valor do input:', newTask);
      setTaskList([...taskList, newTask]);
      setNewTask({ ...newTask, title: "" });
    }
  }

  useEffect(() => {
    console.log(taskList);
  }, [taskList]);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask({ ...newTask, title: e.target.value });
  }

  const removeTask = (index: number) => {
    console.log('remover task: ' + index)
    setTaskList(taskList.filter((_, idx) => idx !== index))
  }

  const handleTaskStatus = (index: number) => {
    const updatedTasks = [...taskList];
    updatedTasks[index].status = updatedTasks[index].status === TaskStatus.Active ? TaskStatus.Completed : TaskStatus.Active;
    setTaskList(updatedTasks);
  }

  return (
    <section className="main_container_app">
      <h1 id="main_title">Todos</h1>
      <main id="main_container_table">
        <div>
          <span>Seta</span>
        </div>
        <div id="input_task_container">
          <input type="text" name="input_task" id="input_task" value={newTask.title} placeholder="Insira uma nova tarefa" onChange={handleChange} onKeyDown={handleKeyDown}  />
        </div>
        <ul id="container_list">
          {taskList.map((task, index) => (
            <li className="item_container" key={index}>
              <input type="checkbox" name="" className="item_status" checked={task.status === TaskStatus.Completed} onChange={() => handleTaskStatus(index)} />
              <div className="item_title">{task.title}</div>
              <button onClick={() => removeTask(index)}>x</button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
