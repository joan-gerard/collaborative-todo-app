import { useCallback, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_TODO } from "../../queries/todoQueries";
import { UPDATE_TODO } from "../../mutations/todoMutations";
import { GET_LISTS } from "../../queries/listQueries";
import { FaPenAlt } from "react-icons/fa";

type EditedTodo = (ITodo & { 
  listId: string | null 
}) | null;

const EditTodoForm: React.FC<EditTodoFormProps> = ({ todo, listId }) => {
  const [editedTodo, setEditedTodo] = useState<EditedTodo>({ ...todo, listId});
  console.log("EditTodoForm", { editedTodo });

  const { loading, error, data } = useQuery(GET_LISTS);

  const [updateTodo] = useMutation(UPDATE_TODO, {
    variables: {
      id: editedTodo?.id,
      // title: editedTodo?.title,
      content: editedTodo?.content,
      deadline: editedTodo?.deadline,
      priority: editedTodo?.priority?.toLowerCase(),
      status: editedTodo?.status?.toLowerCase(),
      listId: editedTodo?.listId,
    },
    refetchQueries: [{ query: GET_TODO, variables: { id: editedTodo?.id } }],
  });

  const handleEditProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateTodo();
  };

  // const setTitle = useCallback(
  //   (title: string) => {
  //     if (editedTodo) {
  //       setEditedTodo({
  //         ...editedTodo,
  //         title,
  //       });
  //     }
  //   },
  //   [editedTodo]
  // );

  const setContent = useCallback(
    (content: string) => {
      if (editedTodo) {
        setEditedTodo({
          ...editedTodo,
          content,
        });
      }
    },
    [editedTodo]
  );

  const setDeadline = useCallback(
    (deadline: string) => {
      if (editedTodo) {
        setEditedTodo({
          ...editedTodo,
          deadline,
        });
      }
    },
    [editedTodo]
  );

  const setPriority = useCallback(
    (priority: string) => {
      if (editedTodo) {
        setEditedTodo({
          ...editedTodo,
          priority,
        });
      }
    },
    [editedTodo]
  );
  const setStatus = useCallback(
    (status: string) => {
      if (editedTodo) {
        setEditedTodo({
          ...editedTodo,
          status,
        });
      }
    },
    [editedTodo]
  );

  const setListId = useCallback(
    (listId: string) => {
      if (editedTodo) {
        setEditedTodo({
          ...editedTodo,
          listId,
        });
      }
    },
    [editedTodo]
  );

  if (loading) return null;
  if (error) return <p>Something went wrong</p>;

  return (
    <>
      <button
        type="button"
        className="btn btn-sm btn-secondary me-1"
        data-bs-toggle="modal"
        data-bs-target={`#updateTodoModal-${editedTodo?.id}`}
      >
        <div className="align-items-center">
          <FaPenAlt className="" />
          {/* <div>Add Task</div> */}
        </div>
      </button>
      <div
        className="modal fade"
        id={`updateTodoModal-${editedTodo?.id}`}
        aria-labelledby="updateTodoModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="updateTodoModalLabel">
                Update task
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleEditProject}>
                {/* <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={editedTodo?.title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div> */}
                <div className="mb-3">
                  <label className="form-label">Task</label>
                  <input
                    type="text"
                    className="form-control"
                    id="content"
                    value={editedTodo?.content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Deadline</label>
                  <input
                    type="date"
                    className="form-control"
                    id="deadline"
                    value={editedTodo?.deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                  ></input>
                </div>
                <div className="mb-3">
                  <label className="form-label">Priority</label>
                  <select
                    id="priority"
                    value={editedTodo?.priority}
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
                    value={editedTodo?.status}
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
                    id="listId"
                    value={editedTodo?.listId || ""}
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
    </>
  );
};

export default EditTodoForm;