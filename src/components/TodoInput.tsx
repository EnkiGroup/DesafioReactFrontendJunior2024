import React from 'react';

interface TodoInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ value, onChange, onKeyPress }) => {
  return (
    <div className="input-container">
      <input
        id="todo-input"
        className="new-todo"
        type="text"
        placeholder="What needs to be done?"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyPress}
      />
      <label className="visually-hidden" htmlFor="todo-input"></label>
    </div>
  );
};

export default TodoInput;
