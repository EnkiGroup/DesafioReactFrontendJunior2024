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

    const updateTaskTitle = (id: string, newTitle: string) => {
        const updatedTasks = todoList.map(task =>
            task.id === id ? { ...task, title: newTitle } : task
        );
        setTodoList(updatedTasks);
    };
    

    if (error) {
        console.error('Error fetching todos:', error);
    }

    const activeTasks = todoList.filter((todo) => !todo.isDone);

    return(
        <section className="main_container_app">
            <header>
                <h1 id="main_title">todos</h1>
            </header>
            <main id="main_container_table">
                <div id="table_header">
                    {todoList.length > 0 && (
                        <button className="arrow_down_container" onClick={handleSetAllTasksCompleted}>
                            <img src={arrowDown} alt="Set All Tasks Completed" />
                        </button>
                    )}
                    <TaskInput
                        newTask={newTask}
                        handleKeyDown={handleKeyDown}
                        handleChange={handleChange}
                    />
                </div>
                {isLoading? 
                    <div id="loading_warning">Carregando...</div> : 
                    <TaskList todoList={filteredTodoList} handleTaskStatus={handleTaskStatus} removeTask={removeTask} updateTaskTitle={updateTaskTitle} />
                } 
                {todoList.length > 0 && <TaskStatusFilter taskCount={activeTasks.length} filter={filter}  setFilter={setFilter} clearAllCompletedTasks={handleClearAllCompletedTasks}  /> } 
            </main>
            <footer id="project_details">
                <span>Clique duas vezes para editar uma tarefa</span>
                <span>Pressione <i><strong>Enter</strong></i> para confirmar alteração de título</span>
                <span>Clique fora do campo da tarefa para sair do modo de edição</span>
                <span>Projeto desenvolvido por Henrique Santiago Pires baseado no TodoMVC da <a href="https://todomvc.com" target="_blank" rel="noopener noreferrer">TodoMVC Team</a></span>
                <span>Desafio front-end júnior - enContact </span>
                <div id="logo_container">
                    <img src={logoenContact} alt="Logo enContact" width={"150px"} />
                </div>
            </footer>
        </section>
    )


}