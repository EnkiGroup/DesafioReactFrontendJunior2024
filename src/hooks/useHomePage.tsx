import { useCallback, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import useGlobalContext from "./useGlobalContext";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

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
    savePreference,
    userPrefersSaving,
    setUserPrefersSaving,
    setTasks,
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
      if (
        (tasks?.length === 0 || tasks?.length === 3) &&
        userPrefersSaving === null
      ) {
        toast((t) => (
          <Toast
            toastMessage="Gostaria de salvar as tarefas?"
            toastButtons={[
              <button onClick={() => savePreference(t, "sim")}>Sim</button>,
              <button onClick={() => savePreference(t, "nao")}>Não</button>,
            ]}
          />
        ));
      }
      incrementTasks(valueInput);
    },

    [valueInput, incrementTasks, savePreference],
  );

  useEffect(() => {
    if (pathname === "/") {
      navigate("all");
    }
    const savedTasks = localStorage.getItem("tasks");
    const userPrefersSaving = localStorage.getItem("userPrefersSaving");

    if (userPrefersSaving) {
      setUserPrefersSaving(userPrefersSaving);
    }

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }

    if (!savedTasks || (userPrefersSaving && userPrefersSaving === "nao")) {
      initialData();
    }
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
