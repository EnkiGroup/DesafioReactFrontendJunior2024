import { useState } from "react";
import CloseIcon from "../../assets/icons/CloseIcon";
import useGlobalContext from "../../hooks/useGlobalContext";
import { TaskProps } from "../../types";
import Checkbox from "../Checkbox";
import { TodoItemContainer, Item, InputEditing } from "./styles";
import toast from "react-hot-toast";

type TodoItemProps = {
  task: TaskProps;
};

const TodoItem = ({ task }: TodoItemProps) => {
  const { removeTask, finishTask, editingTask } = useGlobalContext();

  const [isEditing, setIsEditing] = useState({
    title: task?.title,
    enabledEditing: false,
  });

  const handleChangeEditing = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length >= 30) {
      return toast.error("A tarefa deve conter de 2 a 30 caracteres.");
    }
    setIsEditing((prev) => ({ ...prev, title: value }));
  };

  return (
    <TodoItemContainer
      onDoubleClick={() =>
        setIsEditing((prev) => ({ ...prev, enabledEditing: true }))
      }
      enableEditing={isEditing.enabledEditing}
      isEditing={isEditing.enabledEditing}
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
            onChange={handleChangeEditing}
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
