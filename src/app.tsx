import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from 'react-router-dom';

import "./styles/main.scss";

import { v4 as uuidv4 } from "uuid";

import TodoList from "./components/TodoList";
import TodoInput from "./components/TodoInput";
import TodoFooter from "./components/TodoFooter";
import Footer from "./components/Footer";

// Interface que define a estrutura de cada tarefa (Todo).
export interface Todo {
  id: string;
  title: string;
  isDone: boolean;
  editing: boolean;
}

// Componente principal da aplicação.
const App = () => {
  // Estado para armazenar a lista de todos os todos.
  const [todos, setTodos] = useState<Todo[]>([]);
  // Estado para armazenar o texto do novo todo sendo digitado.
  const [todoNew, setTodoNew] = useState<string>("");

  // Efeito para carregar os 'todos' a partir de uma API.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTodos(data);
      } catch (err) {
        console.error('Failed to fetch todos:', err);
      }
    };

    fetchData();
  }, []);

  // Função para atualizar o estado do texto do novo todo conforme o usuário digita.
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoNew(event.target.value);
  };

  // Função para adicionar um novo 'todo' quando o usuário pressiona Enter.
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && todoNew.trim() !== '') {
      const newTodo: Todo = {
        id: uuidv4(), // Gera um ID único para o novo todo
        title: todoNew.trim(),
        isDone: false,
        editing: false
      };
      setTodos([newTodo, ...todos]); // Adiciona o novo 'todo' à lista de todos
      setTodoNew(""); // Limpa o estado do texto do novo 'todo'
    }
  };

  // Função para marcar todos os 'todos' como concluídos ou não concluídos.
  const handleToggleAll = () => {
    const allCompleted = todos.every(todo => todo.isDone);
    const updatedTodos = todos.map(todo => ({
      ...todo,
      isDone: !allCompleted
    }));
    setTodos(updatedTodos);
  };

  // Função para salvar as alterações feitas em um 'todo' em modo de edição.
  const handleSaveEdit = (id: string, newTitle: string) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, title: newTitle, editing: false };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  // Função para limpar todos os 'todos' marcados como concluídos.
  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.isDone));
  };

  // Componente para filtrar a lista de 'todos' com base na rota atual.
  const FilteredTodoList = () => {
    const location = useLocation();
    let filteredTodos = todos;
    if (location.pathname === '/active') {
      filteredTodos = todos.filter(todo => !todo.isDone);
    } else if (location.pathname === '/completed') {
      filteredTodos = todos.filter(todo => todo.isDone);
    }

    return (
      <TodoList
        todos={filteredTodos}
        setTodos={setTodos}
        handleSaveEdit={handleSaveEdit}
      />
    );
  };

  // Contagem de quantos 'todos' ainda estão ativos (não concluídos).
  const numberChange = todos.filter(todo => !todo.isDone).length;

  return (
    <div>
      <section id="root" className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <TodoInput
            value={todoNew}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
        </header>

        <main className="main">
          {/* Renderiza o controle para marcar todos como concluídos se houver algum 'todo' */}
          {todos.length > 0 && (
            <div className="toggle-all-container">
              <input
                aria-label="Concluir todas as tarefas"
                className="toggle-all"
                type="checkbox"
                checked={todos.every(todo => todo.isDone)}
                onChange={handleToggleAll}
              />
              <label className="toggle-all-label" htmlFor="toggle-all">
                Toggle all
              </label>
            </div>
          )}

          {/* Definição das rotas para filtrar os 'todos' */}
          <Routes>
            <Route path="/" element={<FilteredTodoList />} />
            <Route path="/active" element={<FilteredTodoList />} />
            <Route path="/completed" element={<FilteredTodoList />} />
          </Routes>
        </main>

        {/* Renderiza o rodapé com contagem de 'todos' ativos e opção para limpar 'todos' concluídos */}
        {todos.length > 0 && (
          <TodoFooter
            numberChange={numberChange}
            handleClearCompleted={handleClearCompleted}
          />
        )}
      </section>

      {/* Renderiza o rodapé padrão da aplicação */}
      <Footer />
    </div>
  );
};

export default App;