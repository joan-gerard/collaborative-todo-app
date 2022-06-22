import { gql } from "@apollo/client";

export const ADD_TODO = gql`
  mutation addTodo($title: String!, $content: String!, $status: TodoStatus!) {
    addTodo(title: $title, content: $content, status: $status) {
      id
      title
      content
      status
    }
  }
`;
