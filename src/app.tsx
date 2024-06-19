import { ChangeEvent, KeyboardEvent, useState } from "react";
import "./styles/scss/styles.scss";

export default function App() {
  const [newTask, setNewTask] = useState<string>('')
  
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      console.log('Enter pressionado, valor do input:', newTask);
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value)
  }

  return (
    <section className="main_container_app">
      <h1 id="main_title">Todos</h1>
      <main id="main_container_table">
        <div id="input_task_container">
          <input type="text" name="" id="" placeholder="Insira uma nova tarefa" onChange={handleChange} onKeyDown={handleKeyDown}  />
        </div>
      </main>
      <ul>

      </ul>
    </section>
  );
}
