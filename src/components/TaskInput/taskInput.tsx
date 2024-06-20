import { ChangeEvent, KeyboardEvent } from "react";
import { Task } from "../../types/types";

type TaskInputProps = {
    newTask: Task;
    handleKeyDown: (e: KeyboardEvent) => void;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function TaskInput({ newTask, handleKeyDown, handleChange }: TaskInputProps) {
    return (
        <div id="input_task_container">
        <input
            type="text"
            name="input_task"
            id="input_task"
            value={newTask.title}
            placeholder="Insira uma nova tarefa"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
        />
        </div>
    );
}
