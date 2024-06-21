import CloseIcon from "../../assets/icons/CloseIcon";
import { TaskProps } from "../../types";
import Checkbox from "../Checkbox";
import { TodoItemContainer, Item } from "./styles";

type TodoItemProps = {
  task: TaskProps;
};

const TodoItem = ({ task }: TodoItemProps) => {
  return (
    <TodoItemContainer>
      <Item>
        <Checkbox checked={task?.isDone} />
        <span>{task?.title}</span>
      </Item>
      <CloseIcon />
    </TodoItemContainer>
  );
};

export default TodoItem;
