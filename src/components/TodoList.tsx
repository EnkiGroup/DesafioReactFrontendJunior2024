import { useEffect, useState } from "react";
import { Todo } from "../types/Todo"
import TodoItem from "./TodoItem";

type TodoListProps = {
    todos: Todo[];
    handleDeleteTodo: (id: number) => void;
    handleToggleActive: (id: number) => void;
    handleClearCompleted: () => void;
    handleUpdateDescription: (id: number, newDescription: string) => void
}

export default function TodoList({ todos, handleDeleteTodo, handleToggleActive, handleClearCompleted, handleUpdateDescription }: TodoListProps) {
    const [filter, setFilter] = useState<"All" | "Active" | "Completed">("All");
    const activeTodosCount = todos.filter((todo) => !todo.isCompleted).length;
    const filteredTodos = todos.filter((todo) => {
        if (filter === "Active") {
            return !todo.isCompleted;
        } else if (filter === "Completed") {
            return todo.isCompleted;
        }
        return true;
    });


    return (
        <div>
            <ul className="w-full">
                {filteredTodos.map((todo) => (
                    <li className="bg-white border" key={todo.id}>
                        <TodoItem
                            todo={todo}
                            handleDeleteTodo={handleDeleteTodo}
                            handleToggleActive={handleToggleActive}
                            handleUpdateDescription={handleUpdateDescription}
                        />
                    </li>
                ))}
            </ul>

            <div className="px-4 flex justify-between items-center w-full bg-white border h-7 text-xs">
                <p>{activeTodosCount} Items left</p>
                <button onClick={() => setFilter("All")}>All</button>
                <button onClick={() => setFilter("Active")}>Active</button>
                <button onClick={() => setFilter("Completed")}>Completed</button>
                <button onClick={() => handleClearCompleted()}>Clear Completed</button>
            </div>
        </div>

    )
}
