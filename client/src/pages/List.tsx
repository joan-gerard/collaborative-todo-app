import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GET_LIST } from "../queries/listQueries";
import Spinner from "../components/Spinner";
import { GET_TODOS } from "../queries/todoQueries";

const List = () => {
  const [filteredTodos, setFilteredTodos] = useState([]);
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_LIST, {
    variables: { id },
  });
  const {
    loading: todosLoading,
    error: todosError,
    data: todosData,
  } = useQuery(GET_TODOS);

  useEffect(() => {
    if (!loading && !error && !todosLoading && !todosError) {
      let todos = todosData.todos.filter((todo: ITodo) => {
        return todo.list.id === data.list.id;
      });

      setFilteredTodos(todos);
    }
  }, [todosData]);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && !todosLoading && !todosError && (
        <div className="mx-auto w-75 mt-5 p-5">
          <Link to="/" className="btn btn-light btn-sn 2-25 d-inline ms-auto">
            Home
          </Link>
          <>
            {filteredTodos.map((todo: ITodo, i: number) => (
              <div key={i} className="card flex-row justify-content-between">
                <p>{todo.content}</p>
                <p>{todo.status}</p>
                <p>{todo.priority}</p>
              </div>
            ))}
          </>
        </div>
      )}
    </>
  );
};

export default List;
