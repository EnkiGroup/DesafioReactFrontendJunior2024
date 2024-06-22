import { createContext, useState } from "react";
import { EditingTaskProps, GlobalContextProps, TaskProps } from "../types";
import { v4 as uuidv4 } from "uuid";

export const GlobalContext = createContext({} as GlobalContextProps);

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [valueInput, setValueInput] = useState("");

  const incrementTasks = (value: string) => {
    if (!value) return;
    const taskObj = {
      id: uuidv4(),
      title: value,
      isDone: false,
    };
    setTasks((prevTasks) => [...prevTasks, taskObj]);
    setValueInput("");
  };

  const removeTask = (task: TaskProps) => {
    if (!task) return;
    setTasks((prevTasks) => prevTasks.filter(({ id }) => id !== task.id));
  };

  const finishTask = (task: TaskProps) => {
    if (!task) return;
    setTasks((prevTasks) =>
      prevTasks.map((item) =>
        item.id === task.id ? { ...item, isDone: !item.isDone } : item,
      ),
    );
  };

  const editingTask = (
    task: TaskProps,
    value: string,
    setIsEditing: React.Dispatch<React.SetStateAction<EditingTaskProps>>,
  ) => {
    if (!task) return;
    if (value.length > 1) {
      setTasks((prevTasks) =>
        prevTasks.map((item) =>
          item.id === task.id ? { ...item, title: value } : item,
        ),
      );
      setIsEditing((prev) => ({ ...prev, enabledEditing: false }));
    }
  };

  const enableAllTasks = () => {
    if (tasks.length === 0) return;
    const tasksEnable = tasks.every((task) => task.isDone);
    setTasks((prevTasks) =>
      prevTasks.map((task) => ({ ...task, isDone: !tasksEnable })),
    );
  };

  return (
    <GlobalContext.Provider
      value={{
        tasks,
        setTasks,
        valueInput,
        setValueInput,
        incrementTasks,
        removeTask,
        finishTask,
        enableAllTasks,
        editingTask,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalProvider;
