import { Toast } from "react-hot-toast";

export type TaskProps = {
  id: string;
  title: string;
  isDone: boolean;
};

export type EditingTaskProps = {
  title: string;
  enabledEditing: boolean;
  oldTextValue: string;
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
  clearEnableTasks: () => void;
  initialData: () => Promise<TaskProps[]>;
  isLoading: boolean;
  pathname: string;
  savePreference: (t: Toast, value: string) => void;
  userPrefersSaving: string | null;
  setUserPrefersSaving: React.Dispatch<React.SetStateAction<string | null>>;
  remainingTasks: number;
};
