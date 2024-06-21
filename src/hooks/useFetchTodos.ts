import { useQuery } from "@tanstack/react-query";

export default function useFetchTodos(){

    const TODO_URL = "https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos"

    const { data: todoFetch, error, isLoading} = useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
            const response = await fetch(TODO_URL);
            if (!response.ok) {
                throw new Error('Erro ao buscar os todos');
            }
            return response.json();
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: 3
    });
    
    return{
        todoFetch,
        error,
        isLoading
    }

}