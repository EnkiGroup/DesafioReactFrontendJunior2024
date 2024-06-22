import { useState } from "react";
import CloseIcon from "../../assets/icons/CloseIcon";
import useGlobalContext from "../../hooks/useGlobalContext";
import { TaskProps } from "../../types";
import Checkbox from "../Checkbox";
import { TodoItemContainer, Item, InputEditing } from "./styles";

type TodoItemProps = {
  task: TaskProps;
};

const TodoItem = ({ task }: TodoItemProps) => {
  const { removeTask, finishTask, editingTask } = useGlobalContext();

  const [isEditing, setIsEditing] = useState({
    title: task?.title,
    enabledEditing: false,
  });

  return (
    <TodoItemContainer
      onDoubleClick={() =>
        setIsEditing((prev) => ({ ...prev, enabledEditing: true }))
      }
    >
      <Item isEditing={task?.isDone}>
        {!isEditing?.enabledEditing && (
          <Checkbox
            checked={task?.isDone}
            handleClick={() => finishTask(task)}
          />
        )}
        {isEditing?.enabledEditing ? (
          <InputEditing
            type="text"
            value={isEditing?.title}
            onChange={({ target }) =>
              setIsEditing((prev) => ({ ...prev, title: target.value }))
            }
            onBlur={() => editingTask(task, isEditing?.title, setIsEditing)}
            onKeyPress={(e) =>
              e.key === "Enter" &&
              editingTask(task, isEditing?.title, setIsEditing)
            }
            autoFocus
          />
        ) : (
          <span>{task?.title}</span>
        )}
      </Item>
      <CloseIcon handleClick={() => removeTask(task)} />
    </TodoItemContainer>
  );
};

export default TodoItem;
