const API_URL = "https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos";

export const fetchTodos = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }
  return await response.json();
};

