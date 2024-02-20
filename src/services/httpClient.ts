import axios from "axios";
import { sleep } from "../utils/sleep";

export const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

httpClient.interceptors.response.use(async (data) => {
  await sleep();

  return data;
});
