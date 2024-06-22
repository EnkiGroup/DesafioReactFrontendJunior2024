import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "../utils/api";

export default function useFetchTodos(){

    const { data: todoFetch, error, isLoading} = useQuery({
        queryKey: ['todos'],
        queryFn: fetchTodos,
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