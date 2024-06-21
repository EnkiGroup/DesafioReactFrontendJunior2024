import { Link } from "react-router-dom";

type TaskStatusFilterProps = {
    taskCount: number;
    setFilter: (filter: "all" | "active" | "completed") => void;
    clearAllCompletedTasks: () => void
};

export default function taskStatusFilter({ taskCount, setFilter, clearAllCompletedTasks }: TaskStatusFilterProps){
    return (
        <div id="settings_container">
            <span>{taskCount === 1 ? '1 item restante!' : `${taskCount} itens restantes!`}</span>
            <div>
                <Link to="/" onClick={() => setFilter("all")}>Todas</Link> | 
                <Link to="/active" onClick={() => setFilter("active")}>Ativas</Link> | 
                <Link to="/completed" onClick={() => setFilter("completed")}>Completadas</Link>
            </div>
            <button onClick={clearAllCompletedTasks}>
                Limpar completas
            </button>
        </div>
    );
}