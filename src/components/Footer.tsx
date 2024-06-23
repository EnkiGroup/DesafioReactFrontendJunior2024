import React from 'react';

type TodoFooterProps = {
  todos: Todo[];
};

const TodoFooter: React.FC<TodoFooterProps> = ({ todos }) => {
  const remaining = todos.filter(todo => !todo.completed).length;
  return (
    <footer className="footer">
      <span className="todo-count"><strong>{remaining}</strong> item(s) left</span>
      {/* Filters and Clear completed can be added here */}
    </footer>
  );
};

export default TodoFooter;
