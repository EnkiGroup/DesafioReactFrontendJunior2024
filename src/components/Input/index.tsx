import React, { ComponentProps, useContext, useState } from "react";
import toast from "react-hot-toast";
import { ChevronIcon } from "../../assets/icons/chevron";
import { TaskContext } from "../../contexts/TaskContext";
import { IconContainer, InputContainer } from "./styles";

interface InputProps extends ComponentProps<"input"> {
  placeholder: string;
}

export function Input({ placeholder }: InputProps) {
  const [title, setTitle] = useState("");
  const { handleToggleAllDone, handleAddItem } = useContext(TaskContext);

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.length > 1) {
      handleAddItem({
        id: Math.random().toString(),
        title,
        isDone: false,
      });
      setTitle("");
    } else {
      toast.error("A task precisa ter pelo menos 2 caracteres");
    }
  };

  return (
    <InputContainer onSubmit={handleSubmit}>
      <IconContainer data-testid="icon-container" onClick={handleToggleAllDone}>
        <ChevronIcon />
      </IconContainer>
      <input
        value={title}
        onChange={handleChangeTitle}
        placeholder={placeholder}
      />
    </InputContainer>
  );
}
