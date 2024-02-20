import React, { createContext, useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader";
import { ITask } from "../entities/Task";
import { tasksService } from "../services/tasks";

import { Confetti } from "../components/Confetti";

interface TaskProviderValue {
  tasks: ITask[];
  totalOutstanding: number;
  handleAddItem: (data: ITask) => void;
  deleteTasks: (id: string) => void;
  updatedItemHandler: (data: ITask) => void;
  isClearCompleted: () => void;
  handleToggleAllDone: () => void;
}

export const TaskContext = createContext({} as TaskProviderValue);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allTasksDone, setAllTasksDone] = useState(false);
  const { pathname: route } = useLocation();
  const navigate = useNavigate();

  const loadTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await tasksService.getAll();
      setTasks(result);
    } catch (error) {
      toast.error("Deu ruim parceiro!!");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (route === "/") {
      navigate("/all");
    }
  }, [navigate, route]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  useEffect(() => {
    if (tasks.length === 0) {
      return;
    }
    const checkAllTasksCompleted = () => {
      const allTasksCompleted = tasks.every((task) => task.isDone);

      if (allTasksCompleted) {
        setAllTasksDone(true);
        toast.success("Parabéns você concluiu todas as tarefas!");
      } else {
        setAllTasksDone(false);
      }
    };

    checkAllTasksCompleted();
  }, [tasks]);

  const filteredTasks = () => {
    switch (route) {
      case "/active":
        return tasks.filter((task) => !task.isDone);
      case "/completed":
        return tasks.filter((tasks) => tasks.isDone);
      default:
        return tasks;
    }
  };

  const updatedItemHandler = useCallback(
    ({ id, title, isDone }: ITask) => {
      const updatedTasks = tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            title: title,
            isDone: isDone,
          };
        }

        return task;
      });

      setTasks(updatedTasks);
    },
    [tasks]
  );

  const handleAddItem = useCallback(
    (task: ITask) => {
      setTasks([task, ...tasks]);
    },
    [tasks]
  );

  const handleToggleAllDone = useCallback(() => {
    const allTasksAreDone = tasks.every((task) => task.isDone);
    const updatedTasks = tasks.map((task) => ({
      ...task,
      isDone: !allTasksAreDone,
    }));
    setTasks(updatedTasks);
  }, [tasks]);

  const isClearCompleted = useCallback(() => {
    setTasks(tasks.filter((item) => item.isDone !== true));
  }, [tasks]);

  const deleteTasks = useCallback(
    (taskId: string) => {
      setTasks(tasks.filter((task) => task.id !== taskId));
    },
    [tasks]
  );

  const totalOutstanding = tasks.reduce((acc, value) => {
    if (!value.isDone) {
      return acc + 1;
    }
    return acc;
  }, 0);

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <TaskContext.Provider
      value={{
        tasks: filteredTasks(),
        totalOutstanding,
        deleteTasks,
        handleAddItem,
        isClearCompleted,
        updatedItemHandler,
        handleToggleAllDone,
      }}
    >
      {allTasksDone && <Confetti show={allTasksDone} />}
      {children}
    </TaskContext.Provider>
  );
}
