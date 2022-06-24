import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import ListCard from "./ListCard";
import Spinner from "./Spinner";
import { GET_LISTS } from "../queries/listQueries";

import * as io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

const Lists = () => {
  const { loading, error, data, client } = useQuery(GET_LISTS);

  useEffect(() => {
    socket.on("receive_lists", (dataIO) => {
      console.log("refetching...");

      client.refetchQueries({
        include: [GET_LISTS],
      });
    });
  }, [socket]);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <div className="container border rounded p-2">
      {data.lists.length ? (
        <>
          {!loading && !error && (
            <div className="row mt-3">
              {data.lists.map((list: IList, i: number) => (
                <ListCard key={i} list={list} />
              ))}
            </div>
          )}
        </>
      ) : (
        <h5>No Lists</h5>
      )}
    </div>
  );
};

export default Lists;
