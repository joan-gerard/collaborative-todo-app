import { gql } from "@apollo/client";

export const ADD_TODO = gql`
  mutation addTodo(
    $title: String!
    $content: String!
    $deadline: String!
    $status: TodoStatus!
    $priority: TodoPriority!
    $listId: ID
  ) {
    addTodo(
      title: $title
      content: $content
      deadline: $deadline
      status: $status
      priority: $priority
      listId: $listId
    ) {
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

export const DELETE_TODO = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
      title
      content
      deadline
      status
      priority
    }
  }
`;
