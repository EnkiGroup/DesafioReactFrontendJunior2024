import { Link } from "react-router-dom";

type TaskStatusFilterProps = {
    taskCount: number;
    setFilter: (filter: "all" | "active" | "completed") => void;
    clearAllCompletedTasks: () => void
};

export default function TaskStatusFilter({ taskCount, setFilter, clearAllCompletedTasks }: TaskStatusFilterProps){
    return (
        <div id="settings_container">
            <span>{taskCount === 1 ? '1 item restante!' : `${taskCount} itens restantes!`}</span>
            <ul className="filter_container">
                <li>
                    <Link to="/" onClick={() => setFilter("all")}>Todas</Link> 
                </li>
                <li>
                    <Link to="/active" onClick={() => setFilter("active")}>Ativas</Link> 
                </li>
                <li>
                    <Link to="/completed" onClick={() => setFilter("completed")}>Completadas</Link>
                </li>
            </ul>
            <button onClick={clearAllCompletedTasks}>
                Limpar completadas
            </button>
        </div>
    );
}