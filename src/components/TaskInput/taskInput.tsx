import useTodoList from "../../hooks/useTodoList";

export default function TaskInput() {

    const { newTask, handleKeyDown, handleChange } = useTodoList()

    return (
        <div id="input_task_container">
        <input
            type="text"
            name="input_task"
            id="input_task"
            value={newTask}
            placeholder="Insira uma nova tarefa"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            aria-label="Insira uma nova tarefa"
        />
        
        </div>
    );
}
