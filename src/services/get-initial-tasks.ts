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
    alert("Failed to fetch todo's. Please try again later.");

    const fallbackData: Task[] = [];
    setData(fallbackData);

    return fallbackData;
  }
}
