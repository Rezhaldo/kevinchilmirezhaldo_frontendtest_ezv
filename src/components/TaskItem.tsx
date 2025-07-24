'use client';
import { Todo, useDeleteTodoMutation, useEditTodoMutation } from "@/features/todos/todosApi";
import React from "react";
import toast from 'react-hot-toast';
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";


type Props = {
    task: Todo
};

const TaskItem: React.FC<Props> = ({ task }) => {
    const [isShowEditModal, setIsShowEditModal] = React.useState(false);
    const [isShowDeleteModal, setIsShowDeleteModal] = React.useState(false);
    const [taskToEdit, setTaskToEdit] = React.useState<string>(task.title);

    const [editTodo, { isLoading: isEditing }] = useEditTodoMutation();
    const [deleteTodo, { isLoading: isDeleting }] = useDeleteTodoMutation();

    const toggleEditModal = () => {
        setIsShowEditModal(!isShowEditModal);
    }

    const toggleDeleteModal = () => {
        setIsShowDeleteModal(!isShowDeleteModal);
    }

    const handleEditSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        try {
            await editTodo({ id: task.id, title: taskToEdit }).unwrap();
            toast.success("Task updated!");
            toggleEditModal();
        } catch (error) {
            toast.error("Failed to update task.");
            console.error("Edit failed:", error);
        }
    }

    const handleDelete = async () => {
        try {
            await deleteTodo(task.id).unwrap();
            toast.success("Task deleted!");
            toggleDeleteModal();
        } catch (error) {
            toast.error("Failed to delete task.");
            console.error("Delete failed:", error);
        }
    }


    return (
        <tr>
            <td className="w-full">{task.title}</td>
            <td className="flex gap-4">
                <FiEdit onClick={toggleEditModal} cursor='pointer' className="text-blue-500" size={24} />

                <Modal isShowModal={isShowEditModal} setToggleModal={toggleEditModal}>
                    <form onSubmit={handleEditSubmit}>
                        <h3 className="font-bold text-lg">Edit Task</h3>
                        <div className="modal-action">
                            <input value={taskToEdit} onChange={e => setTaskToEdit(e.target.value)} type="text" placeholder="Type here" className="input w-full" />
                            <button type="submit" className="btn btn-primary">{isEditing ? "Saving..." : "Submit"}
                            </button>
                        </div>
                    </form>
                </Modal>

                <FiTrash2 onClick={toggleDeleteModal} cursor='pointer' className="text-red-500" size={24} />
                <Modal isShowModal={isShowDeleteModal} setToggleModal={toggleDeleteModal}>
                    <h3 className="text-lg">Are you sure, you want to delete this task?</h3>
                    <div className="modal-action">
                        <button onClick={handleDelete} className="btn">{isDeleting ? "Deleting..." : "Yes"}
                        </button>
                    </div>
                </Modal>

            </td>
        </tr>
    );
};

export default TaskItem;