import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_LIST } from "../mutations/listMutations";
import { GET_LISTS } from "../queries/listQueries";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import * as io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

const ListCard: React.FC<ListCardProps> = ({ list }) => {
  const navigate = useNavigate();

  const [deleteList] = useMutation(DELETE_LIST, {
    variables: { id: list.id },
    update(cache, { data: { deleteList } }) {
      const { lists } =
        cache.readQuery<ILists | null>({ query: GET_LISTS }) || {};
      cache.writeQuery({
        query: GET_LISTS,
        data: {
          lists: lists?.filter((list: IList) => list.id !== deleteList.id),
        },
      });
    },
  });

  const handleDeleteList = () => {
    deleteList();
    socket.emit("delete_list", {
      data: { list },
    });
  };

  return (
    <div className="col-md-6">
      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <p>{list.listName}</p>
              <p>{list.listDesc}</p>
            </div>
            <a className="btn btn-secondary" href={`/list/${list.id}`}>
              View
            </a>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDeleteList()}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
