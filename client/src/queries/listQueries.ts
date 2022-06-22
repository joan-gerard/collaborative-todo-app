import { gql } from "@apollo/client";

export const GET_LISTS = gql`
  query getLists {
    lists {
      id
      listName
      listDesc
    }
  }
`;
export const GET_LIST = gql`
  query getList($id: ID!) {
    list(id: $id) {
      id
      listName
      listDesc
    }
  }
`;
