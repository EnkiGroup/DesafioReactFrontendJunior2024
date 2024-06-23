import { useLocation } from 'react-router-dom';
import { useTodo } from '../../context/TodoContext';
import TodoItem from '../item/item';

export default function TodoList() {

  const location = useLocation();
  const { toggleTodo, filterTodos, todos} = useTodo();
  
  const filteredTodos = filterTodos(todos, location.pathname);

  return (
    <div>
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} title={todo.title} isDone={todo.isDone} onToggle={() => toggleTodo(todo.id)} />
      ))}
    </div>
  );
}