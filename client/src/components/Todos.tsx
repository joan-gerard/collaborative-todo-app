import React from "react";
import { useQuery } from "@apollo/client";
import { GET_TODOS } from "../queries/todoQueries";
import Spinner from "../components/Spinner";
import TodoRow from "./TodoRow";

const Todos = () => {
  const { loading, error, data } = useQuery(GET_TODOS);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
        <div>
          {data.todos.map((todo: ITodo, i: number) => (
            <TodoRow key={i} todo={todo} />
          ))}
        </div>
      )}
    </>
  );
};

export default Todos;
