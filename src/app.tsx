import { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import "./styles/main.scss";
import Footer from "./components/Footer";
import { v4 as uuidv4 } from "uuid";

interface Todo {
  id: string;
  title: string;
  isDone: boolean;
}

const App = () => {
  // Estado para manter a lista de tarefas
  const [todos, setTodos] = useState<Todo[]>([]);

  // Estado para manter o texto da nova tarefa
  const [todoNew, setTodoNew] = useState<string>("");

  // Buscando as tarefas na inicialização do componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTodos(data); // Define as tarefas no estado
      } catch (err) {
        console.error('Failed to fetch todos:', err);
      }
    };

    fetchData();
  }, []);

  // Função para atualizar o texto da nova tarefa ao digitar
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoNew(event.target.value);
  };

  // Função para adicionar uma nova tarefa ao pressionar Enter
  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && todoNew.trim() !== '') {
      const newTodo: Todo = {
        id: uuidv4(),  // Gera um ID único para a nova tarefa
        title: todoNew,  // Define o título da tarefa com o texto do estado
        isDone: false  // Define a nova tarefa como "não concluída"
      };
      setTodos([...todos, newTodo]); // Adiciona a nova tarefa no início da lista
      setTodoNew(""); // Limpa o campo de entrada
    }
  };

  // Função para alternar o estado de conclusão de uma tarefa
  const handleToggle = (id: string) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, isDone: !todo.isDone };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  // Função para alternar o estado de conclusão de todas as tarefas
  const handleToggleAll = () => {
    const allCompleted = todos.every(todo => todo.isDone);
    const updatedTodos = todos.map(todo => ({
      ...todo,
      isDone: !allCompleted
    }));
    setTodos(updatedTodos);
  };

  const showToggleAll = todos.length > 0;

  return (
    <div>
      <section id="root" className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <div className="input-container">
            <input
              id="todo-input"
              className="new-todo"
              type="text"
              placeholder="What needs to be done?"
              value={todoNew}
              onChange={handleInputChange}  // Atualiza o texto da nova tarefa
              onKeyDown={handleKeyPress}  // Adiciona a nova tarefa ao pressionar Enter
            />
            <label className="visually-hidden" htmlFor="todo-input">
            </label>
          </div>
        </header>

        <main className="main">
          {showToggleAll && (
            <div className="toggle-all-container">
              <input
                className="toggle-all"
                type="checkbox"
                data-testid="toggle-all"
                checked={todos.length > 0 && todos.every(todo => todo.isDone)}
                onChange={handleToggleAll}
              />
              <label className="toggle-all-label" htmlFor="toggle-all">
                Toggle all
              </label>
            </div>
          )}
          <ul className="todo-list">
            {todos.map(todo => (
              <li key={todo.id} className={todo.isDone ? "completed" : ""}>
                <div className="view">
                  <input
                    className="toggle"
                    type="checkbox"
                    checked={todo.isDone}
                    onChange={() => handleToggle(todo.id)}
                  />
                  <label>
                    {todo.title}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </main>
        
      </section>
      
      <Footer />
    </div>
  );
}

export default App;