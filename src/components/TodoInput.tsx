import React from 'react';

// Define a interface para as propriedades do componente TodoInput.
interface TodoInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

// Componente funcional TodoInput, que recebe as propriedades definidas na interface TodoInputProps.
const TodoInput: React.FC<TodoInputProps> = ({ value, onChange, onKeyPress }) => {
  return (
    <div className="input-container">
      
      {/* Input para inserir novos todos */}
      <input
        id="todo-input"
        className="new-todo"
        type="text"
        placeholder="What needs to be done?"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyPress}
      />

      {/* Rótulo visualmente oculto para acessibilidade */}
      <label className="visually-hidden" htmlFor="todo-input"></label>
    </div>
  );
};

export default TodoInput;
