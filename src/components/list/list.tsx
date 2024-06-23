import { useTodo } from '../../context/TodoContext';
import TodoItem from '../item/item';

export default function TodoList() {
  const {toggleTodo, filterTodos} = useTodo();

  return (
    <div>
      {filterTodos.map((todo) => (
        <TodoItem key={todo.id} title={todo.title} isDone={todo.isDone} onToggle={() => toggleTodo(todo.id)} />
      ))}
    </div>
  );
}