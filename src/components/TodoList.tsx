import { Todo } from "../types/Todo"
import TodoItem from "./TodoItem";

type TodoListProps = {
    todos: Todo[];
    handleDeleteTodo: (id: number) => void;
    handleToggleActive: (id: number) => void;
}

export default function TodoList({ todos, handleDeleteTodo, handleToggleActive }: TodoListProps) {

    return (
        <ul className="w-full">

            {todos.map((todo) => (
                <li className="bg-white border" key={todo.id}>
                    <TodoItem 
                        todo={todo} 
                        handleDeleteTodo={handleDeleteTodo}
                        handleToggleActive={handleToggleActive}
                        />
                </li>
            ))}

        </ul>
    )
}
