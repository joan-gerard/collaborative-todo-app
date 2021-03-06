import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { FaTasks } from "react-icons/fa";
import { ADD_TODO } from "../../mutations/todoMutations";
import { GET_TODOS } from "../../queries/todoQueries";
import { GET_LISTS } from "../../queries/listQueries";

import * as io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

const AddTodoModal = () => {
  // const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("pending");
  const [priority, setPriority] = useState("low");
  const [listId, setListId] = useState<string | null>(null);

  const { loading, error, data } = useQuery(GET_LISTS);

  const [addTodo] = useMutation(ADD_TODO, {
    variables: { content, deadline, status, priority, listId },

    refetchQueries: [{ query: GET_TODOS }],
  });

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (content === "" || deadline === "" || priority === "" || listId === "") {
    //   return alert("Please, fill all fields");
    // }
    socket.emit("send_todos", {
      data: { content, deadline, status, priority, listId },
    });

    addTodo();
    // setTitle("");
    setContent("");
    setDeadline("");
    setPriority("");
    setStatus("");
  };
  if (loading || error) {
    return null;
  }

  return (
    <div>
      <button
        type="button"
        className="btn btn-secondary mt-3 mb-3"
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
                {/* <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div> */}
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
                <div className="mb-3">
                  <label className="form-label">Deadline</label>
                  <input
                    type="date"
                    className="form-control"
                    id="deadline"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                  ></input>
                </div>
                <div className="mb-3">
                  <label className="form-label">Priority</label>
                  <select
                    id="priority"
                    value={priority}
                    className="form-select"
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                    id="status"
                    value={status}
                    className="form-select"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="done">Done</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">List</label>

                  <select
                    id="listID"
                    // value={listId}
                    className="form-select"
                    onChange={(e) => setListId(e.target.value)}
                  >
                    <option value="">Select List</option>

                    {data?.lists?.map((list: IList) => (
                      <option key={list.id} value={list.id}>
                        {list.listName}
                      </option>
                    ))}
                  </select>
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
