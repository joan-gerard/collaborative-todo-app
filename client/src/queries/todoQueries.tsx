import { gql } from "@apollo/client";

export const GET_TODOS = gql`
  query getTodos {
    todos {
      id
      title
      content
      status
    }
  }
`;
export const GET_TODO = gql`
  query getTodo($id: ID!) {
    todo(id: $id) {
      id
      title
      content
      status
    }
  }
`;
