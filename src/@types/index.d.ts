import React from "react";

export interface EnterYourTasksProps{
  isFocused: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  handleChangeFocus: () => void;
  setSecondBoxVisibility: Dispatch<SetStateAction<boolean>>;
}

export interface TasksProps {
  index: number;
  onRemove: (id: string) => void;
  id: string; 
  title: string; 
  isDone: boolean;
  onChange: (event: any) => void;
}

export interface ToDoProps {
  isSecondBoxVisible: boolean;
  setIsSecondBoxVisible: Dispatch<SetStateAction<boolean>>;
}

export interface Tasks {
  id: string;
  title: string;
  isDone: boolean;
}