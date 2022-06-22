import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { FaTasks } from "react-icons/fa";
import { ADD_TODO } from "../mutations/todoMutations";
import { GET_TODOS } from "../queries/todoQueries";

const AddTodoModal = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("new");

  const [addTodo] = useMutation(ADD_TODO, {
    variables: { title, content, status },

    update(cache, { data: { addTodo } }) {
      const { todos } =
        cache.readQuery<ITodos | null>({ query: GET_TODOS }) || {};
      cache.writeQuery({
        query: GET_TODOS,
        data: { todos: [...(todos || []), addTodo] },
      });
    },
  });

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo();
    setTitle("");
    setContent("");
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-secondary mt-3"
        data-bs-toggle="modal"
        data-bs-target="#addTodoModal"
      >
        <div className="d-flex align-items-center">
          <FaTasks className="icon" />
          <div>Add Task</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addTodoModal"
        aria-labelledby="addTodoModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addTodoModalLabel">
                Create a new task
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleAddTodo}>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Task</label>
                  <input
                    type="text"
                    className="form-control"
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-secondary"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTodoModal;
