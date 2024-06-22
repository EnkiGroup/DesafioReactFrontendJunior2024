import { Link } from "react-router-dom";
import { useTodoContext } from "../../context/todoContext";

type TaskStatusFilterProps = {
    filter: "all" | "active" | "completed"
    setFilter: (filter: "all" | "active" | "completed") => void;
};

export default function TaskStatusFilter({ filter, setFilter }: TaskStatusFilterProps){

    const { todoList, clearCompletedTasks } = useTodoContext()
    const activeTaskCount = todoList.filter(task => !task.isDone).length
    
    return (
        <div id="settings_container">
            <span>{activeTaskCount === 1 ? '1 item restante!' : `${activeTaskCount} itens restantes!`}</span>
            <ul className="filter_container">
                <li className={`${filter === 'all'? 'active' : ''}`}>
                    <Link to="/" 
                        onClick={() => setFilter("all")} 
                        aria-label={`Mostrar todas as tarefas. ${
                            filter === "all" ? "Selecionado." : ""
                        }`}>
                            Todas
                    </Link> 
                </li>
                <li className={`${filter === 'active'? 'active' : ''}`}>
                    <Link
                        to="/active"
                        onClick={() => setFilter("active")}
                        aria-label={`Mostrar tarefas ativas. ${
                            filter === "active" ? "Selecionado." : ""
                        }`}
                    >
                        Ativas
                    </Link>
                </li>
                <li className={`${filter === 'completed'? 'active' : ''}`}>
                    <Link
                        to="/completed"
                        onClick={() => setFilter("completed")}
                        aria-label={`Mostrar tarefas completadas. ${
                            filter === "completed" ? "Selecionado." : ""
                        }`}
                    >
                        Completadas
                    </Link>
                </li>
            </ul>
            <button className="clear_all_tasks_btn" onClick={clearCompletedTasks} aria-label="Limpar tarefas completadas">
                Limpar completadas
            </button>
        </div>
    );
}