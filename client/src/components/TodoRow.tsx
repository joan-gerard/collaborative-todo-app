import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_TODO } from "../mutations/todoMutations";
import { GET_TODOS } from "../queries/todoQueries";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import EditTodoForm from "./modals/EditTodoForm";
import UpdateTodoContent from "./UpdateTodoContent";
import { FaPenAlt } from "react-icons/fa";

import * as io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

const TodoRow: React.FC<TodoRowProps> = ({ todo }) => {
  const [deleteTodo] = useMutation(DELETE_TODO, {
    variables: { id: todo.id },
    update(cache, { data: { deleteTodo } }) {
      const { todos } =
        cache.readQuery<ITodos | null>({ query: GET_TODOS }) || {};
      cache.writeQuery({
        query: GET_TODOS,
        data: {
          todos: todos?.filter((todo: ITodo) => todo.id !== deleteTodo.id),
        },
      });
    },
  });

  const handleDeleteTodo = () => {
    deleteTodo();
    socket.emit("delete_project", {
      data: { id: todo.id },
    });
  };

  return (
    <div className="d-flex border rounded my-2 p-0">
      <div className="ps-2 todo-row__list-name">
        <p className="m-2">{todo?.list?.listName}</p>
      </div>
      <div className="todo-row__list-task">
        <div className="d-flex align-items-center">
          {/* <UpdateTodoContent todo={todo} /> */}
          <p className="m-2">{todo.content}</p>
        </div>
      </div>
      <div className="d-flex todo-row__list-priority align-items-center justify-content-between">
        <p className="m-2 priority">{todo.priority}</p>
        <p className="m-2 deadline">{todo.deadline}</p>
        <p className="m-2 status">{todo.status}</p>

        <EditTodoForm todo={todo} listId={todo?.list?.id || null} />

        <button
          className="btn btn-danger btn-sm me-3"
          onClick={() => handleDeleteTodo()}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default TodoRow;
