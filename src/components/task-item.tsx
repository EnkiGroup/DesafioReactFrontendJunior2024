import { Check, X } from "lucide-react";
import { useTasksContext } from "../contexts/tasks-context";

interface Task {
  id: string
  title: string
  isDone: boolean
}

interface TaskItemProps {
  task: Task
}

export function TaskItem({ task }: TaskItemProps) {

  const { toggleTaskCheck } = useTasksContext()

  function handleCheck() {
    toggleTaskCheck(task.id)
  }

  return (
    <li className="relative flex items-center gap-4 px-2 py-4 border-t border-gray-200 peer">
      {task.isDone
        ?
        (
          <>
            <CheckButton isDone={task.isDone} onCheck={handleCheck} />
            <span className="text-2xl text-gray-400 line-through">
              {task.title}
            </span>
            <X className="remove-icon" />
          </>
        )
        :
        (
          <>
            <CheckButton isDone={task.isDone} onCheck={handleCheck} />
            <span className="text-2xl">
              {task.title}
            </span>
            <X className="remove-icon" />
          </>
        )}
    </li>
  )
}
//TODO: A LOGICA VISUAL DO REMOVE ICON TA PRONTA, AGORA FALTA CRIAR A FUNÇÃO DE REMOVER
export function CheckButton({ isDone, onCheck }: { isDone: boolean, onCheck: () => void }) {
  return (
    <label className="relative w-8 h-8 flex items-center justify-center cursor-pointer">
      <input
        type="checkbox"
        checked={isDone}
        onChange={onCheck}
        className="sr-only peer"
      />
      <span className="w-8 h-8 border rounded-full flex items-center justify-center peer-checked:border-green-600">
        {isDone && <Check color="rgb(22 163 74)" />}
      </span>
    </label>
  );
}