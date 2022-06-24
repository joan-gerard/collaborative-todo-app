import { gql } from "@apollo/client";

export const ADD_TODO = gql`
  mutation addTodo(
    $content: String!
    $deadline: String!
    $priority: TodoPriority!
    $listId: ID
  ) {
    addTodo(
      content: $content
      deadline: $deadline
      priority: $priority
      listId: $listId
    ) {
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

export const DELETE_TODO = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
      content
      deadline
      priority
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation updateTodo(
    $id: ID!
    $content: String
    $deadline: String
    $priority: TodoPriorityUpdate
    $listId: ID
  ) {
    updateTodo(
      id: $id
      content: $content
      deadline: $deadline
      priority: $priority
      listId: $listId
    ) {
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

export const UPDATE_TODO_CONTENT = gql`
  mutation updateTodoContent($id: ID!, $content: TodoStatusUpdateSolo!) {
    updateTodoContent(id: $id, content: $content) {
      id
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
