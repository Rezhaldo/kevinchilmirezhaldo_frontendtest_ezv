'use client';
import AddTask from '@/components/AddTask';
import TodoList from '@/components/TodoList';
import { todosApi, useGetTodosQuery } from '@/features/todos/todosApi';
import { configureStore } from '@reduxjs/toolkit';
import { useState } from 'react';
import { Provider } from 'react-redux';

const TODOS_PER_PAGE = 10;
const MAX_TODOS = 200;
const TOTAL_PAGES = Math.ceil(MAX_TODOS / TODOS_PER_PAGE);

export default function TodoListClient({
    page: initialPage,
    preloadedState,
}: {
    page: number;
    preloadedState: any;
}) {
    const [page, setPage] = useState(initialPage);

    const store = configureStore({
        reducer: {
            [todosApi.reducerPath]: todosApi.reducer,
        } as any,
        preloadedState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(todosApi.middleware),
    });

    const params = { page, limit: TODOS_PER_PAGE };
    const { data: todos, isLoading } = useGetTodosQuery(params);

    const onPageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= TOTAL_PAGES) {
            setPage(newPage);
        }
    };

    const renderPageNumbers = () => {
        const pages = [];
        const visiblePages = 5;
        const start = Math.max(1, page - Math.floor(visiblePages / 2));
        const end = Math.min(TOTAL_PAGES, start + visiblePages - 1);
        for (let i = start; i <= end; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`btn btn-sm ${i === page ? 'btn-primary' : 'btn-ghost'}`}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };


    return (
        <Provider store={store}>
            <main className="max-w-4xl mx-auto p-4">
                <div className="text-center my-5 flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">Todo List App</h1>
                    <AddTask />
                </div>
                <TodoList tasks={todos ?? []} />
                <div className="mt-4 flex justify-center gap-4">
                    <button
                        onClick={() => onPageChange(page - 1)}
                        disabled={page === 1}
                        className="btn btn-outline"
                    >
                        Previous
                    </button>
                    {renderPageNumbers()}
                    <button
                        onClick={() => onPageChange(page + 1)}
                        className="btn btn-outline"
                        disabled={todos && todos.length < TODOS_PER_PAGE}
                    >
                        Next
                    </button>
                </div>
            </main>
        </Provider>
    );
}
