import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_TODO } from "../mutations/todoMutations";
import { GET_TODOS } from "../queries/todoQueries";
import { FaTrash } from "react-icons/fa";

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
  };

  return (
    <div className="container d-flex flex-row justify-content-between border rounded mb-3 p-0">
      <div className="ps-2">
        <p className="m-0">{todo.title}</p>
        <p className="m-0">{todo.content}</p>
        {/* <p className="m-0">{todo.status}</p> */}
      </div>
      <button
        className="btn btn-danger btn-sm"
        onClick={() => handleDeleteTodo()}
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default TodoRow;
