export type Task = {
    title: string;
    status: TaskStatus;
};

export enum TaskStatus {
    Active = "Ativo",
    Completed = "Completado"
}
