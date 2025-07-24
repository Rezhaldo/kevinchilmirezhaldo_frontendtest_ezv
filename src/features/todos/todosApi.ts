import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], GetTodosParams>({
      query: ({page, limit}) => ({
        url: 'todos',
        params: {
          _page: page,
          _limit: limit,
        }}),
        providesTags: ['Todos'], 
    }),

    addTodo: builder.mutation<Todo, Partial<Todo>>({
      query: ({title}) => ({
        url: '/todos',
        method: 'POST', 
        body: { title, completed: false },
      }),
        invalidatesTags: ['Todos'],
    }),

    deleteTodo: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todos'],
    }),

    editTodo: builder.mutation<Todo, Partial<Todo> & { id: number }>({
      query: ({ id, ...patch }) => ({
        url: `/todos/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['Todos'],
    }),
   
  }),
 
});


export const { useGetTodosQuery, useAddTodoMutation, useDeleteTodoMutation, useEditTodoMutation } = todosApi;


export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

interface GetTodosParams {
  page: number;
  limit: number;
}

 