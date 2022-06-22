import { gql } from "@apollo/client";

export const ADD_LIST = gql`
  mutation addList($listName: String!, $listDesc: String!) {
    addList(listName: $listName, listDesc: $listDesc) {
      id
      listName
      listDesc
    }
  }
`;
export const DELETE_LIST = gql`
  mutation deleteList($id: ID!) {
    deleteList(id: $id) {
      id
      listName
      listDesc
    }
  }
`;
