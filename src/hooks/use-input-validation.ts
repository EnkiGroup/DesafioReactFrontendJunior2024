import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const taskSchema = z.object({
  title: z.string().min(2),
});

type TaskSchema = z.infer<typeof taskSchema>;

export function useInputValidation(defaultValue = "") {
  const { register, handleSubmit, reset, setFocus } = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
    defaultValues: { title: defaultValue },
  });

  useEffect(() => {
    setFocus("title");
  }, [setFocus]);

  return { register, handleSubmit, reset };
}
