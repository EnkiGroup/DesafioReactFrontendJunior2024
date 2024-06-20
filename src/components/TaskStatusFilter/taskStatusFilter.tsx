import { Link } from "react-router-dom";

type TaskStatusFilterProps = {
    taskCount: number;
};

export default function taskStatusFilter({ taskCount }: TaskStatusFilterProps){
    return (
        <div id="settings_container">
            <span>{taskCount === 1 ? '1 item restante!' : `${taskCount} itens restantes!`}</span>
            <div>
                <Link to="/">Todas</Link> | <Link to="/active">Ativas</Link> | <Link to="/completed">Completadas</Link>
            </div>
            <div>Limpar completas</div>
        </div>
    );
}