'use client'
import { useAddTodoMutation } from "@/features/todos/todosApi";
import React, { FormEventHandler, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";

type Props = {};

const AddTask: React.FC<Props> = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [newTaskValue, setNewTaskValue] = useState<string>('');
  const [addTodo, { isLoading, isSuccess, error }] = useAddTodoMutation();

  const toggleModal = () => {
    setIsShowModal(!isShowModal);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!newTaskValue.trim()) return;

    try {
      await addTodo({ title: newTaskValue }).unwrap(); // fire mutation
      console.log("Task added:", newTaskValue);
      setNewTaskValue(''); // clear input
      toggleModal(); // close modal
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  return (
    <div>
      <button onClick={toggleModal} className="btn btn-primary w-full">
        Add new task <AiOutlinePlus className="ml-2" size={16} />
      </button>

      <Modal isShowModal={isShowModal} setToggleModal={toggleModal}>
        <form onSubmit={handleSubmit}>
          <h3 className="font-bold text-lg">Add new task</h3>
          <div className="modal-action flex flex-col gap-2">
            <input
              value={newTaskValue}
              onChange={e => setNewTaskValue(e.target.value)}
              type="text"
              placeholder="Type here"
              className="input w-full"
              disabled={isLoading}
            />
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Adding...' : 'Submit'}
            </button>
            {error && (
              <span className="text-red-500 text-sm">Something went wrong.</span>
            )}
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
