import { useTodo } from '../../context/TodoContext';
import TodoItem from '../item/item';

export default function TodoList() {
  const { todos, toggleTodo } = useTodo();


  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} title={todo.title} isDone={todo.isDone} onToggle={() => toggleTodo(todo.id)} />
      ))}
    </div>
  );
}