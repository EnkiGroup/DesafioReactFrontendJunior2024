import { TodosState } from "./TodosState";

export type TodosContextValue = TodosState & {
    handleAddTodo: (title: string) => void;
    handleDeleteTodo: (id: string) => void;
    handleClearCompleted: () => void;
    handleToggleActive: (id: string) => void;
    handleUpdateDescription: (id: string, newTitle: string) => void;
    handleSetAllCompleted: () => void
}