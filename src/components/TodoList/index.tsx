import { TaskProps } from "../../types";
import TodoItem from "../TodoItem";

type TodoListProps = {
  ItemList: TaskProps[];
};

const TodoList = ({ ItemList }: TodoListProps) => {
  return (
    <>
      {ItemList?.map((item) => (
        <div key={item?.id}>
          <TodoItem task={item} />
        </div>
      ))}
    </>
  );
};

export default TodoList;
