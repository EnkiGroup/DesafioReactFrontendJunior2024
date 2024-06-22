import { useCallback } from "react";
import useGlobalContext from "./useGlobalContext";

const useHomePage = () => {
  const { valueInput, setValueInput, tasks, incrementTasks, enableAllTasks } =
    useGlobalContext();
  const tasksEnable = tasks.length
    ? tasks?.every(({ isDone }) => isDone)
    : false;

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (valueInput.length > 1) {
        incrementTasks(valueInput);
      }
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
  };
};

export default useHomePage;
