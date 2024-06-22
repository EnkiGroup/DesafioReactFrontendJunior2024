import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getInitialTasks } from '../services/get-initial-tasks';

import { Task } from '../types';

interface TasksContextType {
  tasks: Task[]
  tasksLeft: number
  addTask: (title: string) => void;
  updateTaskTitle: (newTask: { id: string, title: string }) => void;
  removeTask: (id: string) => void;
  toggleTaskCheck: (id: string) => void;
  toggleAllTasksCheck: () => void;
  clearCompletedTasks: () => void;
  isTasksListEmpty: boolean
}

export const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider = ({ children }: { children: ReactNode }) => {

  const [tasks, setTasks] = useState<Task[]>([])

  const [tasksLeft, setTasksLeft] = useState<number>(0)

  function addTask(title: string) {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      isDone: false,
    };

    setTasks((tasks) => [...tasks, newTask]);
  }

  function updateTaskTitle(newTask: { id: string, title: string }) {
    const newTasks = tasks.map(task => {
      return task.id === newTask.id ? { ...task, title: newTask.title } : task
    })

    setTasks(newTasks)
  }

  function removeTask(id: string) {
    const newTask = tasks.filter(task => task.id !== id)

    setTasks(newTask)
  }

  function toggleTaskCheck(id: string) {
    const newTasks = tasks.map(task => {
      return task.id === id ? { ...task, isDone: !task.isDone } : task
    })

    setTasks(newTasks)
  }

  function toggleAllTasksCheck() {
    const newTasks = tasks.map(task => {
      return tasksLeft != 0 ? { ...task, isDone: true } : { ...task, isDone: false }
    })

    setTasks(newTasks)
  }

  function clearCompletedTasks() {
    const newTasks = tasks.filter(task => task.isDone === false)

    setTasks(newTasks)
  }

  function setInitialTasks(data: Task[]) {
    setTasks(data)
  }

  useQuery({
    queryKey: ["initialTasks"],
    queryFn: () => getInitialTasks(setInitialTasks),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  })

  useEffect(() => {
    setTasksLeft(tasks.filter(task => task.isDone === false).length)
  }, [tasks])

  return (
    <TasksContext.Provider value={{
      tasks,
      tasksLeft,
      addTask,
      updateTaskTitle,
      removeTask,
      toggleTaskCheck,
      toggleAllTasksCheck,
      clearCompletedTasks,
      isTasksListEmpty: tasks.length === 0,
    }}>
      {children}
    </TasksContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTasksContext = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasksContext must be used within a TasksProvider');
  }
  return context;
};