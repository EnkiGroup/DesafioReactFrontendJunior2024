import React from 'react';
import { Todo } from '../app';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  handleSaveEdit: (id: string, newTitle: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, setTodos, handleSaveEdit }) => {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          todos={todos}
          setTodos={setTodos}
          handleSaveEdit={handleSaveEdit}
        />
      ))}
    </ul>
  );
};

export default TodoList;