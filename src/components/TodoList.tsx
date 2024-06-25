import React from 'react';
import { Todo } from '../app';
import TodoItem from './TodoItem';

// Define a interface para as propriedades do componente TodoList.
interface TodoListProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  handleSaveEdit: (id: string, newTitle: string) => void;
}

// Componente funcional TodoList, que recebe as propriedades definidas na interface TodoListProps.
const TodoList: React.FC<TodoListProps> = ({ todos, setTodos, handleSaveEdit }) => {
  return (
    // Lista não ordenada que contém os itens da lista de todos
    <ul className="todo-list">
      {/* Mapeia cada todo para renderizar um componente TodoItem para cada um */}
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          todos={todos}
          setTodos={setTodos}  // Função para atualizar o estado dos todos
          handleSaveEdit={handleSaveEdit}  // Função para salvar edições no título do todo
        />
      ))}
    </ul>
  );
};

export default TodoList;