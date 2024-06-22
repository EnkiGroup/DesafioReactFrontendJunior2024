import axios from "axios";

import { Task } from "../types";

export async function getInitialTasks(setData: (data: Task[]) => void) {
  try {
    const response = await axios.get(
      "https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos"
    );

    const data: Task[] = response.data;

    setData(data);

    return data;
  } catch (error) {
    console.log(error);
  }
}
