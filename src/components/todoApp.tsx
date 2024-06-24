import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import arrowDown from "../assets/images/arrow-down.png";
import { useTodoContext } from "../context/todoContext";
import useFetchTodos from "../hooks/useFetchTodos";
import Footer from "./Footer/footer";
import TaskInput from "./TaskInput/taskInput";
import TaskList from "./TaskList/taskList";
import TaskStatusFilter from "./TaskStatusFilter/taskStatusFilter";

export default function TodoApp(){

    const { error, isLoading } = useFetchTodos()
    const { todoList, toggleAllTasks } = useTodoContext();
    const location = useLocation();
    const navigate = useNavigate();
    
    const [filter, setFilter] = useState<"all" | "active" | "completed">(() => {
        if (location.pathname.includes("active")) return "active";
        if (location.pathname.includes("completed")) return "completed";
        return "all";
    });

    const filteredTodoList = todoList.filter(todo => {
        if (filter === "active") return !todo.isDone;
        if (filter === "completed") return todo.isDone;
        return true; 
    });

    useEffect(() => {
        navigate(`/${filter}`);
    }, [filter, navigate]);

    return(
        <section className="main_container_app">
            <header>
                <h1 id="main_title">todos</h1>
            </header>
            <main id="main_container_table">
                <div id="table_header">
                    {todoList.length > 0 && (
                        <button className="arrow_down_container" 
                            onClick={toggleAllTasks}
                            aria-label="Definir todas as tarefas como concluídas"
                        >
                            <img src={arrowDown} alt="Set All Tasks Completed" />
                        </button>
                    )}
                    <TaskInput />
                </div>
                {isLoading? 
                    <div id="loading_warning" aria-live="assertive" aria-busy="true">Carregando...</div> : 
                    <TaskList todoList={filteredTodoList} />
                } 
                {error && <div id="error_warning">Houve um erro ao exibir a lista</div>
                
                }
                {todoList.length > 0 && <TaskStatusFilter filter={filter} setFilter={setFilter} /> } 
            </main>
            <Footer />
        </section>
    )


}