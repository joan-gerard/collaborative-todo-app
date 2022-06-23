import { gql } from "@apollo/client";

export const GET_TODOS = gql`
  query getTodos {
    todos {
      id
      title
      content
      deadline
      status
      priority
    }
  }
`;
export const GET_TODO = gql`
  query getTodo($id: ID!) {
    todo(id: $id) {
      id
      title
      content
      deadline
      status
      priority
      list {
        id
        listName
        listDesc
      }
    }
  }
`;
