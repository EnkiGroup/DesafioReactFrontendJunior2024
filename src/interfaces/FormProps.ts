import Todo from "./Todo";

export default interface FormProps {
    todos: Todo[];
    addTodo: (todo: Todo) => void;
    finishAllTodos: () => void;
}