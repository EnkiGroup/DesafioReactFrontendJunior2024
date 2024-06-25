import TodoItem from "./TodoItem";
import { useTodosContext } from "../store/todos-context";
import { Link, useLocation } from "react-router-dom";

export default function TodoList() {
    const todosCtx = useTodosContext();
    const location = useLocation();
    const filter = location.pathname.replace("/", "") as "" | "active" | "completed";
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
                    <li className="bg-white-2 shadow-lg" key={todo.id}>
                        <TodoItem todo={todo} />
                    </li>
                ))}
            </ul>

            {todosCtx.todos.length !== 0 &&
                <div className="px-4 flex justify-between items-center w-full bg-white h-10 text-sm
                border-2 border-gray-1 border-opacity-20 shadow-lg">
                    <p>{activeTodosCount} {activeTodosCount === 1 || activeTodosCount === 0 ? "Item" : "Items"}</p>
                    <div className="px-6 w-1/2 flex justify-between">
                        <Link 
                            className={`p-1 ${filter === '' ? 'ring-1 ring-red ring-opacity-60 rounded-md shadow-sm' : 'hover:ring-1 ring-gray-1 rounded-md ring-opacity-60 '}`} 
                            to={"/"}>All
                        </Link>
                        <Link 
                            className={`p-1  ${filter === 'active' ? 'ring-1 ring-red ring-opacity-60 rounded-md shadow-sm' : 'hover:ring-1 ring-gray-1 rounded-md ring-opacity-60 '}`} 
                            to={"/active"}>Active
                        </Link>
                        <Link 
                            className={`p-1  ${filter === 'completed' ? 'ring-1 ring-red ring-opacity-60 rounded-md shadow-sm' : 'hover:ring-1 ring-gray-1 rounded-md ring-opacity-60 '}`} 
                            to={"/completed"}>Completed
                        </Link>
                    </div>
                    <button className="hover:underline" onClick={() => todosCtx.handleClearCompleted()}>Clear Completed</button>
                </div>
            }

        </div>

    )
}
