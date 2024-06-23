import { Todo } from "../types/Todo"
import TodoItem from "./TodoItem";

type TodoListProps = {
    todos: Todo[];
}

export default function TodoList({ todos }: TodoListProps) {

    return (
        <ul className="w-full">

            {todos.map((todo) => (
                <li className="bg-white border" key={todo.id}>
                    <TodoItem id={todo.id} description={todo.description} isActive={todo.isActive} />
                </li>
            ))}

        </ul>
    )
}
