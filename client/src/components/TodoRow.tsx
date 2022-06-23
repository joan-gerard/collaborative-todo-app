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
    <div className="d-flex border rounded mb-3 p-0">
      <div className="ps-2 todo-row__list-name">
        <p className="m-2">{todo.list.listName}</p>
      </div>
      <div className="todo-row__list-task">
        <p className="m-2">{todo.content}</p>
      </div>
      <div className="d-flex todo-row__list-priority align-items-center">
        <p className="m-2 deadline">{todo.deadline}</p>
        <p className="m-0 status">{todo.status}</p>
        <p className="m-2 priority">{todo.priority}</p>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDeleteTodo()}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default TodoRow;
