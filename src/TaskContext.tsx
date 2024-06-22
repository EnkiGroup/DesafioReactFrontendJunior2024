import { createContext, useState } from "react";
import { Task } from "./types";

type Props = {
    children: React.ReactNode
}
  
const TaskContext = createContext<{ tasks: Task[]; setTasks: React.Dispatch<React.SetStateAction<Task[]>> | any; }>({tasks:[],setTasks:null});

const TaskProvider = ({children}:Props)=>{
  const [tasks,setTasks] = useState<Array<Task>>([])
  return(
    <TaskContext.Provider value={{tasks,setTasks}}>
      {children}
    </TaskContext.Provider>
  )
}


export {TaskContext,TaskProvider}