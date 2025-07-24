import React from "react";

type Props = {
    isShowModal: boolean;
    setToggleModal: () => void;
    children?: React.ReactNode;
};

const AddTaskModal: React.FC<Props> = ({ isShowModal, setToggleModal, children }) => {
    return (
        <div className={`modal ${isShowModal ? "modal-open" : ""}`}>
            <div className="modal-box relative">
                <label onClick={setToggleModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                </label>
                {children}
            </div>
        </div>

    );
};

export default AddTaskModal;