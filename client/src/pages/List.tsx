import { useQuery } from "@apollo/client";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { GET_LIST } from "../queries/listQueries";
import Spinner from "../components/Spinner";

const List = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_LIST, {
    variables: { id },
  });

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
        <div>
          <Link to="/" className="btn btn-light btn-sn 2-25 d-inline ms-auto">
            Home
          </Link>

          <p>{data.list.listName}</p>
          <p>{data.list.listDesc}</p>
        </div>
      )}
    </>
  );
};

export default List;
