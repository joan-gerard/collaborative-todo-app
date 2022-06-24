import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_TODOS } from "../queries/todoQueries";
import Spinner from "../components/Spinner";
import TodoRow from "./TodoRow";
import TodosTable from "./TodosTable";

import * as io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

const Todos = () => {
  const { loading, error, data, client } = useQuery(GET_TODOS);

  useEffect(() => {
    socket.on("receive_todos", (dataIO) => {
      // console.log("receive_projects - dataIO: ", dataIO.name);
      // const projectExist = data?.projects.find((project: IProject) => {
      //   return project.name === dataIO.name;
      // });
      // console.log("projectExist: ", projectExist);
      // if (!projectExist) {

      client.refetchQueries({
        include: [GET_TODOS],
      });
    });
  }, [socket]);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  console.log("Todos", { data });

  return (
    <div className="container border rounded p-2">
      {data.todos.length ? (
        <>
          {!loading && !error && (
            <div>
              {data.todos.map((todo: ITodo, i: number) => (
                <TodoRow key={i} todo={todo} />
              ))}
            </div>
          )}
          {/* <TodosTable /> */}
        </>
      ) : (
        <h5 className="m-0">No Tasks</h5>
      )}
    </div>
  );
};

export default Todos;
