import React from "react";
import { FaTrash } from "react-icons/fa";

const TodoRow: React.FC<TodoRowProps> = ({ todo }) => {
  return (
    <div className="d-flex justify-content-between align-items-center border rounded ps-2 mb-2">
      <p className="m-0">{todo.title}</p>
      <p className="m-0">{todo.content}</p>
      <p className="m-0">{todo.status}</p>
      <button className="btn btn-danger btn-sm" onClick={() => {}}>
        <FaTrash />
      </button>
    </div>
  );
};

export default TodoRow;
