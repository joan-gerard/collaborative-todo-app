import * as React from "react";
import { useQuery } from "@apollo/client";
import { GET_TODOS } from "../queries/todoQueries";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Spinner from "../components/Spinner";

interface Column {
  id: "title" | "content" | "deadline" | "status" | "priority";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "title", label: "Title", minWidth: 170 },
  { id: "content", label: "Content", minWidth: 100 },
  {
    id: "deadline",
    label: "Deadline",
    minWidth: 170,
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "status",
    label: "Status",
    minWidth: 170,
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "priority",
    label: "Priority",
    minWidth: 170,
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  title: string;
  content: string;
  deadline: string;
  status: string;
  priority: string;
}

// function createData(
//   name: string,
//   code: string,
//   population: number,
//   size: number
// ): Data {
//   const density = population / size;
//   return { name, code, population, size, density };
// }

export default function TodosTable() {
  const { loading, error, data } = useQuery(GET_TODOS);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  console.log("page", page);
  console.log("rowsPerPage", rowsPerPage);

  return (
    <>
      {!loading && !error && (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.todos
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((todo: ITodo, i: number) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                        {columns.map((column) => {
                          const value = todo[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 7, 10]}
            component="div"
            count={data.todos.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </>
  );
}
