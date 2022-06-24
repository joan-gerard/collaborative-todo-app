import { gql } from "@apollo/client";

export const ADD_TODO = gql`
  mutation addTodo(
    $content: String!
    $deadline: String!
    $priority: TodoPriority!
    $status: TodoStatus!
    $listId: ID
  ) {
    addTodo(
      content: $content
      deadline: $deadline
      priority: $priority
      status: $status
      listId: $listId
    ) {
      id
      content
      deadline
      priority
      status
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
      status
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation updateTodo(
    $id: ID!
    $content: String
    $deadline: String
    $priority: TodoPriorityUpdate
    $status: TodoStatusUpdate
    $listId: ID
  ) {
    updateTodo(
      id: $id
      content: $content
      deadline: $deadline
      priority: $priority
      status: $status
      listId: $listId
    ) {
      id
      content
      deadline
      priority
      status
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
