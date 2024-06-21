import { useEffect, useState } from "react";
import useFetchTodos from "../hooks/useFetchTodos";
import TaskStatusFilter from "./TaskStatusFilter/taskStatusFilter";
import TaskList from "./TaskList/taskList";
import TaskInput from "./TaskInput/taskInput";
import useTodoList from "../hooks/useTodoList";
import logoenContact from "../assets/images/logoenContact.jpg";
import arrowDown from "../assets/images/arrow-down.png"

export default function TodoApp(){

    const { todoFetch, error, isLoading } = useFetchTodos()
    const { newTask, todoList, setTodoList, handleKeyDown, handleChange, removeTask, handleTaskStatus, handleClearAllCompletedTasks, handleSetAllTasksCompleted } = useTodoList(todoFetch);
    const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

    useEffect(() => {
        if (todoFetch) {
        setTodoList(todoFetch);
        }
    }, [todoFetch, setTodoList])

    useEffect(() => {
        console.log(todoList)
    }, [todoList])

    const filteredTodoList = todoList.filter(todo => {
        if (filter === "active") return !todo.isDone;
        if (filter === "completed") return todo.isDone;
        return true; 
    });

    if (error) {
        console.error('Error fetching todos:', error);
    }

    return(
        <section className="main_container_app">
            <h1 id="main_title">Todos</h1>
            <main id="main_container_table">
                <div id="table_header">
                    <button className="arrow_down_container" onClick={handleSetAllTasksCompleted}>
                        <img src={arrowDown} alt="Set All Tasks Completed" width="15px" /> 
                    </button>
                    <TaskInput
                        newTask={newTask}
                        handleKeyDown={handleKeyDown}
                        handleChange={handleChange}
                    />
                </div>
                {isLoading? <div id="loading_warning">Carregando...</div> : <TaskList todoList={filteredTodoList} handleTaskStatus={handleTaskStatus} removeTask={removeTask} />} 
                {todoList.length > 0 && <TaskStatusFilter taskCount={todoList.length}  setFilter={setFilter} clearAllCompletedTasks={handleClearAllCompletedTasks}  /> } 
            </main>
            <div id="project_details">
                <span>Clique duas vezes para editar uma tarefa</span>
                <span>Henrique Santiago Pires</span>
                <span>Desafio front-end júnior - enContact </span>
                <div id="logo_container">
                    <img src={logoenContact} alt="Logo enContact" width={"150px"} />
                </div>
            </div>
        </section>
    )


}