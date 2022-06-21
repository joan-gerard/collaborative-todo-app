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
