import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { UPDATE_TODO_CONTENT } from "../mutations/todoMutations";
import { GET_TODO } from "../queries/todoQueries";

const UpdateTodoContent: React.FC<EditTodoFormProps> = ({ todo }) => {
  const [content, setContent] = useState("");

  const [updateTodoTitle] = useMutation(UPDATE_TODO_CONTENT, {
    variables: { id: todo.id, content },
    refetchQueries: [{ query: GET_TODO, variables: { id: todo.id } }],
  });

  const handleEditTodoTitle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateTodoTitle();
  };

  //   if (loading) return null;
  //   if (error) return <p>Something went wrong</p>;

  return (
    <>
      <button
        type="button"
        className=" btn p-0 align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#updateTodoTitleModal"
      >
        <div className="">
          <BsThreeDotsVertical />
          {/* <div>Add Task</div> */}
        </div>
      </button>

      <div
        className="modal fade"
        id="updateTodoTitleModal"
        aria-labelledby="updateTodoTitleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="updateTodoTitleModalLabel">
                Update title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleEditTodoTitle}>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
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
    </>
  );
};

export default UpdateTodoContent;
