export const TODO_URL = "https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos";

export async function fetchTodos() {
    const response = await fetch(TODO_URL);
    if (!response.ok) {
        throw new Error("Erro ao buscar os todos");
    }
    return response.json();
}
