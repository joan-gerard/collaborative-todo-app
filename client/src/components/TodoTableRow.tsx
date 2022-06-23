import { useMutation } from "@apollo/client";
import { TableCell, TableRow } from "@mui/material";
import { makeStyles, withStyles } from "@material-ui/core";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { DELETE_TODO } from "../mutations/todoMutations";
import { GET_TODOS } from "../queries/todoQueries";

const StyledTableRow = withStyles((theme) => ({
  root: {
      height: "10px"
  },
}))(TableRow);

const StyledTableCell = withStyles((theme) => ({
  root: {
    padding: "40px",
  },
}))(TableCell);

const TodoTableRow: React.FC<TodoTableRowProps> = ({ columns, todo, i }) => {
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
    <>
      <StyledTableRow hover role="checkbox" tabIndex={-1} key={i}>
        {columns.map((column: any) => {
          const value = todo[column.id];
          return (
            <StyledTableCell key={column.id} align="left">
              {value}
            </StyledTableCell>
          );
        })}
        <StyledTableCell>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDeleteTodo()}
          >
            <FaTrash />
          </button>
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
};

export default TodoTableRow;
