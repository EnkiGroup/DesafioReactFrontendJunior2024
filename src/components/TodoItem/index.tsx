import { useState } from "react";
import CloseIcon from "../../assets/icons/CloseIcon";
import useGlobalContext from "../../hooks/useGlobalContext";
import { TaskProps } from "../../types";
import Checkbox from "../Checkbox";
import { TodoItemContainer, Item, InputEditing } from "./styles";
import { handleEditAction } from "../../utils/validationInputForm";
import toast from "react-hot-toast";

type TodoItemProps = {
  task: TaskProps;
};

const TodoItem = ({ task }: TodoItemProps) => {
  const { removeTask, finishTask, editingTask } = useGlobalContext();

  const [isEditing, setIsEditing] = useState({
    title: task?.title,
    enabledEditing: false,
    oldTextValue: task?.title,
  });

  const handleChangeEditing = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsEditing((prev) => ({ ...prev, title: value }));
  };

  const handleOnBlurEditing = () => {
    handleEditAction(task, isEditing, setIsEditing, editingTask);
  };

  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleEditAction(task, isEditing, setIsEditing, editingTask);
    }
  };

  return (
    <TodoItemContainer
      onDoubleClick={() =>
        setIsEditing((prev) => ({ ...prev, enabledEditing: true }))
      }
      enableEditing={isEditing.enabledEditing}
      isEditing={isEditing.enabledEditing}
      role="todoItem"
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
            onBlur={handleOnBlurEditing}
            onKeyPress={handleOnKeyPress}
            role="inputEditing"
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
