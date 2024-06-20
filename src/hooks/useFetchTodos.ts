import { useQuery } from "@tanstack/react-query";

export default function useFetchTodos(){

    const TODO_URL = "https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos"

    const { data: todoFetch, error} = useQuery({
        queryKey: ['todos'],
        queryFn: () => fetch(TODO_URL).then((res) => res.json())
    })
    
    return{
        todoFetch,
        error
    }

}