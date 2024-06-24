import { useState, useEffect } from "react"
import { TodosState } from "../types/TodosState";
import { Todo } from "../types/Todo";

type FetchResult<T> = {
  data: Todo[] | null;
  isPending: boolean;
  error: string | null;
};

export const useTodosFetch = (url: string): FetchResult<Todo[]> => {
  const [data, setData] = useState<Todo[] | null>(null)
  const [isPending, setIsPending] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async () => {
      setIsPending(true)
      
      try {
        const res = await fetch(url, { signal: controller.signal })
        if(!res.ok) {
          throw new Error(res.statusText)
        }
        const data = await res.json()

        setIsPending(false)
        setData(data)
        setError(null)
      } catch (err) {
        if ((err as Error).name === "AbortError") {
          console.log("the fetch was aborted")
        } else {
          setIsPending(false)
          setError('Could not fetch the data')
        }
      }
    }

    fetchData()

    return () => {
      controller.abort()
    }

  }, [url])

  return { data, isPending, error }
}