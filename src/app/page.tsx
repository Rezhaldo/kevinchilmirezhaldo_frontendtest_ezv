import { todosApi } from "@/features/todos/todosApi";
import { store } from "@/store";
import TodoListClient from "./TodoListClient";


export const revalidate = 60; // Enable ISR: rebuild this page every 60s

const TODOS_PER_PAGE = 10;

export default async function Home() {
  const page = 1;

  // 1. Fetch data on server with RTK Query
  await store.dispatch(
    todosApi.endpoints.getTodos.initiate({ page, limit: TODOS_PER_PAGE })
  );

  // 2. Extract the serialized state
  const preloadedState = store.getState();

  return (
    <TodoListClient page={page} preloadedState={preloadedState} />
  );
}
