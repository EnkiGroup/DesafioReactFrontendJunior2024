import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Task } from '../types';

interface TasksContextType {
  tasks: Task[]
  tasksLeft: number
  addTask: (title: string) => void;
  updateTaskTitle: (newTask: { id: string, title: string }) => void;
  removeTask: (id: string) => void;
  toggleTaskCheck: (id: string) => void;
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
      toggleTaskCheck
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