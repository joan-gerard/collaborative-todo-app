import { gql } from "@apollo/client";

export const ADD_TODO = gql`
  mutation addTodo($title: String!, $content: String!, $deadline: String!, $status: TodoStatus!, $priority: TodoPriority!) {
    addTodo(title: $title, content: $content, deadline: $deadline, status: $status, priority: $priority) {
      id
      title
      content
      deadline
      status
      priority
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
