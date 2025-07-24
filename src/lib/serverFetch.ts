export async function fetchTodosSSR(page: number, limit: number) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${limit}`);
  
  if (!res.ok) throw new Error('Failed to fetch todos');

  const todos = await res.json();
  return todos;
}