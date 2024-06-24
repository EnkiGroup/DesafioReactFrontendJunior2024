import { TodosState } from "./TodosState";

export type TodosContextValue = TodosState & {
    handleAddTodo: (description: string) => void;
    handleDeleteTodo: (id: number) => void;
    // handleClearCompleted: () => void;
    // handleToggleActive: (id: number) => void;
    // handleUpdateDescription: (id: number, newDescription: string) => void;
    // handleSetAllCompleted: () => void
}