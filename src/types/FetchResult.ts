import { Todo } from "./Todo";

export type FetchResult<T> = {
    data: Todo[] | null;
    isPending: boolean;
    error: string | null;
  };