export type TaskProps = {
  id: string;
  title: string;
  isDone: boolean;
};

export type EditingTaskProps = {
  title: string;
  enabledEditing: boolean;
};

export type GlobalContextProps = {
  tasks: TaskProps[];
  setTasks: React.Dispatch<React.SetStateAction<TaskProps[]>>;
  valueInput: string;
  setValueInput: React.Dispatch<React.SetStateAction<string>>;
  incrementTasks: (value: string) => void;
  removeTask: (task: TaskProps) => void;
  finishTask: (task: TaskProps) => void;
  enableAllTasks: () => void;
  editingTask: (
    task: TaskProps,
    value: string,
    setIsEditing: React.Dispatch<React.SetStateAction<EditingTaskProps>>,
  ) => void;
};
