import React from 'react';
import { NavLink } from 'react-router-dom';

// Define a interface para as propriedades do componente TodoFooter.
interface TodoFooterProps {
  numberChange: number; // Número de itens restantes
  handleClearCompleted: () => void; // Função para limpar itens completados
}

// Componente funcional TodoFooter, que recebe as propriedades definidas na interface TodoFooterProps.
const TodoFooter: React.FC<TodoFooterProps> = ({ numberChange, handleClearCompleted }) => {
  return (
    // Elemento do rodapé com a classe "footer" e um atributo data-testid para testes automatizados.
    <footer className="footer" data-testid="footer">
      
      {/* Contador de itens restantes */}
      <span className="todo-count">{numberChange} item{numberChange !== 1 ? 's' : ''} left!</span>

      {/* Lista não ordenada para filtros de navegação, com um atributo data-testid para testes automatizados. */}
      <ul className="filters" data-testid="footer-navigation">
        <li>
          {/* Opção de filtro para "All", usando NavLink para navegação com estilo condicional */}
          <NavLink className={({ isActive }) => isActive ? "selected" : ""} to="/">
            All
          </NavLink>
        </li>
        <li>
          {/* Opção de filtro para "Active", usando NavLink para navegação com estilo condicional */}
          <NavLink className={({ isActive }) => isActive ? "selected" : ""} to="/active">
            Active
          </NavLink>
        </li>
        <li>
          {/* Opção de filtro para "Completed", usando NavLink para navegação com estilo condicional */}
          <NavLink className={({ isActive }) => isActive ? "selected" : ""} to="/completed">
            Completed
          </NavLink>
        </li>
      </ul>

      {/* Botão para limpar itens completados, com ação definida pelo onClick */}
      <button className="clear-button" onClick={handleClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

export default TodoFooter;