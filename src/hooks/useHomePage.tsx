import { useCallback, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import useGlobalContext from "./useGlobalContext";
import { useNavigate } from "react-router-dom";

const useHomePage = () => {
  const {
    valueInput,
    setValueInput,
    tasks,
    incrementTasks,
    enableAllTasks,
    clearEnableTasks,
    initialData,
    pathname,
  } = useGlobalContext();

  const navigate = useNavigate();

  const tasksEnable = useMemo(
    () => (tasks?.length ? tasks.every(({ isDone }) => isDone) : false),
    [tasks],
  );
  const remainingTasks = useMemo(
    () => tasks.filter(({ isDone }) => !isDone),
    [tasks],
  );

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

  useEffect(() => {
    if (pathname === "/") {
      navigate("all");
    }
    initialData();
  }, []);

  useEffect(() => {
    if (tasksEnable) {
      toast.success("Parabéns! Você completou todas as suas tarefas!");
    }
  }, [tasksEnable]);

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
