import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTasksContext } from "../contexts/tasks-context";

const taskSchema = z.object({
  title: z.string().min(2),
});

type TaskSchema = z.infer<typeof taskSchema>;

export function useInputValidation() {
  const { register, handleSubmit, reset } = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
  });
  
  const { addTask } = useTasksContext()
  
  const onSubmit = ({title}: TaskSchema) => {
    addTask(title)

    reset();
  };

  return { register, handleSubmit: handleSubmit(onSubmit) };
}
