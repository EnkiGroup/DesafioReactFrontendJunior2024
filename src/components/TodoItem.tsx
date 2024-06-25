import React, { useRef, useEffect } from 'react';
import { Todo } from '../app';

// Define a interface para as propriedades do componente TodoItem.
interface TodoItemProps {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>; // Função para atualizar o estado dos todos
  handleSaveEdit: (id: string, newTitle: string) => void; // Função para salvar edições no título do todo
}

// Componente funcional TodoItem, que recebe as propriedades definidas na interface TodoItemProps.
const TodoItem: React.FC<TodoItemProps> = ({ todo, todos, setTodos, handleSaveEdit }) => {
  // Referência para o input de edição do título do todo
  const inputRef = useRef<HTMLInputElement>(null);

  // Efeito para focar no input de edição quando o modo de edição é ativado
  useEffect(() => {
    if (todo.editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [todo.editing]); // Executa o efeito quando a propriedade todo.editing muda

  return (
    // Item da lista de todos, com classes dinâmicas baseadas nos estados do todo
    <li className={`${todo.isDone ? "completed" : ""} ${todo.editing ? "editing" : ""}`}>
      <div className="view">
        {/* Checkbox para marcar o todo como completo ou incompleto */}
        <input
          className="toggle"
          type="checkbox"
          checked={todo.isDone}
          onChange={() => {
            // Atualiza o estado dos todos ao marcar/desmarcar como completo
            setTodos(todos.map(t => t.id === todo.id ? { ...t, isDone: !t.isDone } : t));
          }}
        />
        {/* Rótulo que exibe o título do todo */}
        <label onDoubleClick={() => {
          // Ativa o modo de edição quando o rótulo é clicado duas vezes
          setTodos(todos.map(t => t.id === todo.id ? { ...t, editing: true } : t));
        }}>
          {todo.title} {/* Exibe o título do todo */}
        </label>

        <button className="delete" onClick={() => {
          // Remove o todo da lista de todos ao clicar no botão de deletar
          setTodos(todos.filter(t => t.id !== todo.id));
        }}></button>
      </div>
      
      {/* Input de edição do título do todo, visível apenas quando o modo de edição está ativado */}
      {todo.editing && (
        <input
          ref={inputRef} // Referência para o input de edição
          type="text"
          className="edit"
          value={todo.title}
          onChange={(e) => setTodos(todos.map(t => t.id === todo.id ? { ...t, title: e.target.value } : t))}
          // Salva as alterações ao sair do foco do input
          onBlur={() => handleSaveEdit(todo.id, todo.title)}
          onKeyDown={(e) => {
            // Salva as alterações ao pressionar Enter e cancela a edição ao pressionar Escape
            if (e.key === 'Enter') {
              handleSaveEdit(todo.id, todo.title);
            } else if (e.key === 'Escape') {
              setTodos(todos.map(t => t.id === todo.id ? { ...t, editing: false } : t));
            }
          }}
        />
      )}
    </li>
  );
};

export default TodoItem;