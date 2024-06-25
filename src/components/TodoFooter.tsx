import React from 'react';
import { NavLink } from 'react-router-dom';

interface TodoFooterProps {
  numberChange: number;
  handleClearCompleted: () => void;
}

const TodoFooter: React.FC<TodoFooterProps> = ({ numberChange, handleClearCompleted }) => {
  return (
    <footer className="footer" data-testid="footer">
      <span className="todo-count">{numberChange} item{numberChange !== 1 ? 's' : ''} left!</span>
      <ul className="filters" data-testid="footer-navigation">
        <li>
          <NavLink className={({ isActive }) => isActive ? "selected" : ""} to="/">
            All
          </NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => isActive ? "selected" : ""} to="/active">
            Active
          </NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => isActive ? "selected" : ""} to="/completed">
            Completed
          </NavLink>
        </li>
      </ul>
      <button className="clear-button" onClick={handleClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

export default TodoFooter;
