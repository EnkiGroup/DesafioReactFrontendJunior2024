import { Items } from "../components/Items";
import { Todo } from "../app";
import { Filters } from "../components/Filters";

type AllArgsProps = {
  removeTodo: (id: string) => void;
  toggleTodoStatus: (id: string) => void;
  updateTodoTitle: (id: string, newTitle: string) => void;
  removeAllCompletedTodos: () => void;
  todoList: Todo[];
};

export const All: React.FC<AllArgsProps> = ({
  removeTodo,
  toggleTodoStatus,
  updateTodoTitle,
  removeAllCompletedTodos,
  todoList,
}) => {
  return (
    <>
      {/* Todo List */}
      <ol className="text-xl *:mt-3">
        {todoList.map((todo, index) => (
          <Items
            key={index}
            removeTodo={removeTodo}
            toggleTodoStatus={toggleTodoStatus}
            updateTodoTitle={updateTodoTitle}
            todo={todo}
          />
        ))}
      </ol>
      {/* Filters */}
      <Filters
        todoList={todoList}
        removeAllCompletedTodos={removeAllCompletedTodos}
      />
    </>
  );
};
