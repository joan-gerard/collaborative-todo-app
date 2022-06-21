import React from "react";
import { gql, useQuery } from "@apollo/client";
import ListCard from "./ListCard";
import Spinner from "./Spinner";

import { GET_LISTS } from "../queries/listQueries";

// const GET_LISTS = gql`
//   query getLists {
//     lists {
//       id
//       listName
//       listDesc
//     }
//   }
// `;

const Lists = () => {
  const { loading, error, data } = useQuery(GET_LISTS);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
        <div className="row mt-3">
          {data.lists.map((list: IList, i: number) => (
            <ListCard key={i} list={list} />
            // <p key={i}>{list.listDesc}</p>
          ))}
        </div>
      )}
    </>
  );
};

export default Lists;
