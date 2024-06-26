import api from "../services/api";

export default async function fetchAllAsks() {
  const { data } = await api.get("/todos");
  return data;
}
