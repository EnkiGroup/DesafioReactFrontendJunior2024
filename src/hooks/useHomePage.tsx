import { useCallback } from "react";
import toast from "react-hot-toast";
import useGlobalContext from "./useGlobalContext";

const useHomePage = () => {
  const {
    valueInput,
    setValueInput,
    tasks,
    incrementTasks,
    enableAllTasks,
    clearEnableTasks,
  } = useGlobalContext();
  const tasksEnable = tasks.length
    ? tasks?.every(({ isDone }) => isDone)
    : false;
  const remainingTasks = tasks?.filter(({ isDone }) => isDone === false);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (valueInput?.length === 0 || valueInput?.length === 1) {
        return toast.error("A tarefa deve conter no mínimo 2 caracteres.");
      }
      incrementTasks(valueInput);
    },

    [valueInput, incrementTasks],
  );

  return {
    handleSubmit,
    setValueInput,
    tasks,
    valueInput,
    enableAllTasks,
    tasksEnable,
    remainingTasks,
    clearEnableTasks,
  };
};

export default useHomePage;
