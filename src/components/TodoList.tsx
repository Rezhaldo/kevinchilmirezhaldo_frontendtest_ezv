import { Todo } from "@/features/todos/todosApi";
import React from "react";
import TaskItem from "./TaskItem";

type Props = {
    tasks: Todo[]
};

const TodoList: React.FC<Props> = ({ tasks }) => {

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>Tasks</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TodoList;