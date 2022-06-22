import { useState } from "react";
import { FaClipboardList } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_LIST } from "../mutations/listMutations";
import { GET_LISTS } from "../queries/listQueries";

const AddListModal = () => {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const [addList] = useMutation(ADD_LIST, {
    variables: { listName: category, listDesc: description },

    update(cache, { data: { addList } }) {
      const { lists } =
        cache.readQuery<ILists | null>({ query: GET_LISTS }) || {};
      cache.writeQuery({
        query: GET_LISTS,
        data: { lists: [...(lists || []), addList] },
      });
    },
  });

  const handleAddList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addList();
    setCategory('')
    setDescription('')
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-secondary mt-3"
        data-bs-toggle="modal"
        data-bs-target="#addListModal"
      >
        <div className="d-flex align-items-center">
          <FaClipboardList className="icon" />
          <div>Add List</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addListModal"
        aria-labelledby="addListModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addListModalLabel">
                Create a new list
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleAddList}>
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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

export default AddListModal;
