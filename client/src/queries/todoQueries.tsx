import { gql } from "@apollo/client";

export const GET_TODOS = gql`
  query getTodos {
    todos {
      id
      content
      deadline
      priority
      list {
        id
        listName
        listDesc
      }
    }
  }
`;
export const GET_TODO = gql`
  query getTodo($id: ID!) {
    todo(id: $id) {
      id
      content
      deadline
      priority
      list {
        id
        listName
        listDesc
      }
    }
  }
`;
