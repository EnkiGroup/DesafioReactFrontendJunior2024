import toast from "react-hot-toast";
import { TaskProps, EditingTaskProps } from "../types";

export const handleEditAction = (
  task: TaskProps,
  editingState: EditingTaskProps,
  setEditingState: React.Dispatch<React.SetStateAction<EditingTaskProps>>,
  editingTask: Function,
) => {
  if (editingState.title.length < 2 || editingState.title.length >= 30) {
    setEditingState((prev: any) => ({
      ...prev,
      title: editingState.oldTextValue,
    }));
    setEditingState((prev: any) => ({ ...prev, enabledEditing: false }));
    return toast.error("A tarefa deve conter de 2 a 30 caracteres.");
  }
  editingTask(task, editingState.title, setEditingState);
};
