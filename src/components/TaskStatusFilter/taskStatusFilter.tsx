import { Link } from "react-router-dom";

type TaskStatusFilterProps = {
    taskCount: number;
    filter: "all" | "active" | "completed"
    setFilter: (filter: "all" | "active" | "completed") => void;
    clearAllCompletedTasks: () => void
};

export default function TaskStatusFilter({ taskCount, filter, setFilter, clearAllCompletedTasks }: TaskStatusFilterProps){
    return (
        <div id="settings_container">
            <span>{taskCount === 1 ? '1 item restante!' : `${taskCount} itens restantes!`}</span>
            <ul className="filter_container">
                <li className={`${filter === 'all'? 'active' : ''}`}>
                    <Link to="/" onClick={() => setFilter("all")}>Todas</Link> 
                </li>
                <li className={`${filter === 'active'? 'active' : ''}`}>
                    <Link to="/active" onClick={() => setFilter("active")}>Ativas</Link> 
                </li>
                <li className={`${filter === 'completed'? 'active' : ''}`}>
                    <Link to="/completed" onClick={() => setFilter("completed")}>Completadas</Link>
                </li>
            </ul>
            <button className="clear_all_tasks_btn" onClick={clearAllCompletedTasks}>
                Limpar completadas
            </button>
        </div>
    );
}