import TodoItem from "./TodoItem";
import { useTodosContext } from "../store/todos-context";
import { Link, useLocation } from "react-router-dom";


export default function TodoList() {
    const todosCtx = useTodosContext();
    const location = useLocation();
    const filter = location.pathname.replace("/", "") as "/" | "active" | "completed";
    const activeTodosCount = todosCtx.todos.filter((todo) => !todo.isDone).length;

    const filteredTodos = todosCtx.todos.filter((todo) => {
        if (filter === "active") {
            return !todo.isDone;
        } else if (filter === "completed") {
            return todo.isDone;
        }
        return true;
    });

    return (
        <div>
            <ul className="w-full">
                {filteredTodos.map((todo) => (
                    <li className="bg-white-2 border border-gray-1 border-opacity-20 shadow-lg" key={todo.id}>
                        <TodoItem todo={todo}/>
                    </li>
                ))}
            </ul>


            {todosCtx.todos.length !== 0 &&
                <div className="px-4 flex justify-between items-center w-full bg-white h-10 text-sm
                border border-gray-1 border-opacity-20 shadow-lg">
                    <p>{activeTodosCount} Items left</p>
                    <Link to={"/"}>All</Link>
                    <Link to={"/active"}>Active</Link>
                    <Link to={"/completed"}>Completed</Link>
                    <button onClick={() => todosCtx.handleClearCompleted()}>Clear Completed</button>
                </div>
            }

        </div>

    )
}
