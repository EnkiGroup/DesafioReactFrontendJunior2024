import { createContext, useMemo, useState } from "react";
import { EditingTaskProps, GlobalContextProps, TaskProps } from "../types";
import toast, { Toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";
import fetchAllAsks from "../utils/fetchAllTasks";

export const GlobalContext = createContext({} as GlobalContextProps);

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [valueInput, setValueInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userPrefersSaving, setUserPrefersSaving] = useState<string | null>(
    null,
  );
  const { pathname } = useLocation();

  const renderContent = useMemo(() => {
    switch (pathname) {
      case "/active":
        return tasks?.filter(({ isDone }) => !isDone);
      case "/completed":
        return tasks?.filter(({ isDone }) => isDone);
      default:
        return tasks;
    }
  }, [pathname, tasks]);

  const incrementTasks = (value: string) => {
    if (!value) return;
    const taskObj = {
      id: uuidv4(),
      title: value,
      isDone: false,
    };
    setTasks((prevTasks) => {
      const newTasks = [taskObj, ...prevTasks];
      if (userPrefersSaving === "sim") {
        localStorage.setItem("tasks", JSON.stringify(newTasks));
      }
      return newTasks;
    });

    setValueInput("");
  };

  const removeTask = (task: TaskProps) => {
    if (!task) return;
    setTasks((prevTasks) => {
      const newTasks = prevTasks.filter(({ id }) => id !== task.id);
      if (userPrefersSaving === "sim") {
        localStorage.setItem("tasks", JSON.stringify(newTasks));
      }
      return newTasks;
    });
  };

  const finishTask = (task: TaskProps) => {
    if (!task) return;
    setTasks((prevTasks) => {
      const newTasks = prevTasks.map((item) =>
        item.id === task.id ? { ...item, isDone: !item.isDone } : item,
      );
      if (userPrefersSaving === "sim") {
        localStorage.setItem("tasks", JSON.stringify(newTasks));
      }
      return newTasks;
    });
  };

  const editingTask = (
    task: TaskProps,
    value: string,
    setIsEditing: React.Dispatch<React.SetStateAction<EditingTaskProps>>,
  ) => {
    if (!task) return;
    if (value?.length === 0 || value?.length === 1) {
      return toast.error("A tarefa deve conter de 2 a 30 caracteres.");
    }
    setTasks((prevTasks) => {
      const newTasks = prevTasks.map((item) =>
        item.id === task.id ? { ...item, title: value } : item,
      );
      if (userPrefersSaving === "sim") {
        localStorage.setItem("tasks", JSON.stringify(newTasks));
      }
      return newTasks;
    });
    setIsEditing((prev) => ({ ...prev, enabledEditing: false }));
  };

  const enableAllTasks = () => {
    if (tasks.length === 0) return;
    const tasksEnable = tasks.every((task) => task.isDone);
    setTasks((prevTasks) => {
      const newTasks = prevTasks.map((task) => ({
        ...task,
        isDone: !tasksEnable,
      }));
      if (userPrefersSaving === "sim") {
        localStorage.setItem("tasks", JSON.stringify(newTasks));
      }
      return newTasks;
    });
  };

  const clearEnableTasks = () => {
    if (tasks.length === 0) return;

    setTasks((prevTasks) => {
      const tasksEnable = prevTasks.filter(({ isDone }) => !isDone);
      if (userPrefersSaving === "sim") {
        localStorage.setItem("tasks", JSON.stringify(tasksEnable));
      }
      return tasksEnable;
    });
  };

  const initialData = async (): Promise<TaskProps[]> => {
    try {
      setIsLoading(true);
      const data = await fetchAllAsks();
      setTasks(data);
      return data;
    } catch (erro) {
      toast.error(
        "Houve um problema ao carregar as tarefas. Por favor, tente novamente mais tarde.",
      );
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const savePreference = (t: Toast, value: string) => {
    localStorage.setItem("userPrefersSaving", value);
    setUserPrefersSaving(value);
    toast.dismiss(t.id);
  };

  const remainingTasks = tasks.reduce(
    (count, task) => (!task.isDone ? count + 1 : count),
    0,
  );

  return (
    <GlobalContext.Provider
      value={{
        tasks: renderContent,
        setTasks,
        valueInput,
        setValueInput,
        incrementTasks,
        removeTask,
        finishTask,
        enableAllTasks,
        editingTask,
        clearEnableTasks,
        initialData,
        isLoading,
        pathname,
        savePreference,
        userPrefersSaving,
        setUserPrefersSaving,
        remainingTasks,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalProvider;
