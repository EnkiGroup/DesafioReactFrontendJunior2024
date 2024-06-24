import { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import "./styles/main.scss";
import Footer from "./components/Footer";
import { v4 as uuidv4 } from "uuid";

// Interface que define a estrutura de cada tarefa (Todo)
interface Todo {
  id: string;
  title: string;
  isDone: boolean;
  editing: boolean; // Propriedade para controlar o modo de edição da tarefa
}

const FILTER_ALL = 'All';
const FILTER_ACTIVE = 'Active';
const FILTER_COMPLETED = 'Completed';

const App = () => {
  // Estado para armazenar a lista de tarefas
  const [todos, setTodos] = useState<Todo[]>([]);

  // Estado para armazenar o texto da nova tarefa a ser adicionada
  const [todoNew, setTodoNew] = useState<string>("");

  const [activeFilter, setActiveFilter] = useState<string>(FILTER_ALL);

  // Busca as tarefas ao inicializar o componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTodos(data); // Define as tarefas recuperadas do servidor no estado
      } catch (err) {
        console.error('Failed to fetch todos:', err);
      }
    };

    fetchData();
  }, []);

  // Atualiza o texto da nova tarefa conforme o usuário digita
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoNew(event.target.value);
  };

  // Adiciona uma nova tarefa ao pressionar Enter
  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && todoNew.trim() !== '') {
      const newTodo: Todo = {
        id: uuidv4(),  // Gera um ID único para a nova tarefa
        title: todoNew,  // Define o título da nova tarefa com o texto atual
        isDone: false,  // Define a nova tarefa como não concluída por padrão
        editing: false // Define o modo de edição como falso para a nova tarefa
      };
      setTodos([...todos, newTodo]); // Adiciona a nova tarefa à lista de tarefas
      setTodoNew(""); // Limpa o campo de entrada após adicionar a tarefa
    }
  };

  // Alterna o estado de conclusão de uma tarefa específica
  const handleToggle = (id: string) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, isDone: !todo.isDone }; // Alterna o estado de conclusão da tarefa clicada
      }
      return todo;
    });
    setTodos(updatedTodos); // Atualiza a lista de tarefas com as alterações
  };

  // Alterna o estado de conclusão de todas as tarefas
  const handleToggleAll = () => {
    const allCompleted = todos.every(todo => todo.isDone); // Verifica se todas as tarefas estão concluídas
    const updatedTodos = todos.map(todo => ({
      ...todo,
      isDone: !allCompleted // Alterna o estado de conclusão de todas as tarefas
    }));
    setTodos(updatedTodos); // Atualiza a lista de tarefas com as alterações
  };

  // Remove uma tarefa da lista ao clicar no botão de delete
  const handleDelete = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id)); // Filtra a tarefa com base no ID para removê-la da lista
  };

  // Ativa o modo de edição ao clicar duas vezes em uma tarefa
  const handleDoubleClick = (id: string) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, editing: true }; // Ativa o modo de edição para a tarefa clicada
      }
      return todo;
    });
    setTodos(updatedTodos); // Atualiza a lista de tarefas com as alterações
  };

  // Salva as alterações feitas durante a edição de uma tarefa
  const handleSaveEdit = (id: string, newTitle: string) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, title: newTitle, editing: false }; // Salva o novo título e desativa o modo de edição
      }
      return todo;
    });
    setTodos(updatedTodos); // Atualiza a lista de tarefas com as alterações
  };

  // Contagem de tarefas não concluídas
  const numberChange = todos.filter(todo => !todo.isDone).length;


  // Manipula o clique nos filtros
  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  // Filtra as tarefas com base no filtro ativo
  const filteredTodos = todos.filter(todo => {
    if (activeFilter === FILTER_ACTIVE) {
      return !todo.isDone;
    } else if (activeFilter === FILTER_COMPLETED) {
      return todo.isDone;
    }
    return true;
  });

  // Limpa todas as tarefas concluídas
  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.isDone));
  };

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
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
            />
            <label className="visually-hidden" htmlFor="todo-input"></label>
          </div>
        </header>

        <main className="main">
          {todos.length > 0 && (
            <div className="toggle-all-container">
              <input
                className="toggle-all"
                type="checkbox"
                data-testid="toggle-all"
                checked={todos.every(todo => todo.isDone)} // Verifica se todas as tarefas estão concluídas
                onChange={handleToggleAll} // Alterna o estado de conclusão de todas as tarefas
              />
              <label className="toggle-all-label" htmlFor="toggle-all">
                Toggle all
              </label>
            </div>
          )}
          <ul className="todo-list">
            {filteredTodos.map(todo => (
              <li key={todo.id} className={`${todo.isDone ? "completed" : ""} ${todo.editing ? "editing" : ""}`}>
                <div className="view">
                  <input
                    className="toggle"
                    type="checkbox"
                    checked={todo.isDone}
                    onChange={() => handleToggle(todo.id)} // Alterna o estado de conclusão da tarefa
                  />
                  <label onDoubleClick={() => handleDoubleClick(todo.id)}>
                    {todo.title}
                  </label>
                  <button className="delete" onClick={() => handleDelete(todo.id)}></button>
                </div>
                {todo.editing && ( // Renderiza o campo de edição se o modo de edição estiver ativado
                  <input
                    type="text"
                    className="edit"
                    value={todo.title}
                    onChange={(e) => setTodos(todos.map(t => t.id === todo.id ? { ...t, title: e.target.value } : t))}
                    onBlur={() => handleSaveEdit(todo.id, todo.title)} // Salva as alterações ao perder o foco
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSaveEdit(todo.id, todo.title); // Salva as alterações ao pressionar Enter
                      }
                    }}
                  />
                )}
              </li>
            ))}
          </ul>
        </main>

        {todos.length > 0 && (
          <footer className="footer" data-testid="footer">
            <span className="todo-count">{numberChange} item{numberChange !== 1 ? 's' : ''} left!</span>
            <ul className="filters" data-testid="footer-navigation">
              <li>
                <a
                  className={activeFilter === FILTER_ALL ? "selected" : ""}
                  href="#/"
                  onClick={() => handleFilterClick(FILTER_ALL)}
                >
                  All
                </a>
              </li>
              <li>
                <a
                  className={activeFilter === FILTER_ACTIVE ? "selected" : ""}
                  href="#/active"
                  onClick={() => handleFilterClick(FILTER_ACTIVE)}
                >
                  Active
                </a>
              </li>
              <li>
                <a
                  className={activeFilter === FILTER_COMPLETED ? "selected" : ""}
                  href="#/completed"
                  onClick={() => handleFilterClick(FILTER_COMPLETED)}
                >
                  Completed
                </a>
              </li>
            </ul>
            <button className="clear-button" onClick={handleClearCompleted}>
              Clear completed
            </button>
          </footer>
        )}
      </section>

      <Footer />
    </div>
  );
}

export default App;