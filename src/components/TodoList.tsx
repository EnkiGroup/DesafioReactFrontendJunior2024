import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../app';

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