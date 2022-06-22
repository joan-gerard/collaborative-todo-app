import Todo from "../models/Todo";
import List from "../models/List";

import {
  GraphQLEnumType,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";

// Types
const TodoType = new GraphQLObjectType({
  name: "Todo",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    deadline: { type: GraphQLString },
    status: { type: GraphQLString },
    priority: { type: GraphQLString },
  }),
});
const ListType = new GraphQLObjectType({
  name: "List",
  fields: () => ({
    id: { type: GraphQLID },
    listName: { type: GraphQLString },
    listDesc: { type: GraphQLString },
  }),
});

// Root Queries
const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    todos: {
      type: new GraphQLList(TodoType),
      resolve(parent, args) {
        return Todo.find();
      },
    },
    todo: {
      type: TodoType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Todo.findById(args.id);
      },
    },
    lists: {
      type: new GraphQLList(ListType),
      resolve(parent, args) {
        return List.find();
      },
    },
    list: {
      type: ListType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return List.findById(args.id);
      },
    },
  },
});

// Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addTodo: {
      type: TodoType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) },
        deadline: { type: new GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "TodoStatus",
            values: {
              new: { value: "Pending" },
              completed: { value: "Done" },
            },
          }),
          defaultValue: "Pending",
        },
        priority: {
          type: new GraphQLEnumType({
            name: "TodoPriority",
            values: {
              low: { value: "Low" },
              medium: { value: "Medium" },
              high: { value: "High" },
            },
          }),
          defaultValue: "Low",
        },
      },
      resolve(parent, args) {
        const todo = new Todo({
          title: args.title,
          content: args.content,
          deadline: args.deadline,
          status: args.status,
          priority: args.priority,
        });
        return todo.save();
      },
    },
    addList: {
      type: ListType,
      args: {
        listName: { type: new GraphQLNonNull(GraphQLString) },
        listDesc: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const list = new List({
          listName: args.listName,
          listDesc: args.listDesc,
        });
        return list.save();
      },
    },
    deleteList: {
      type: ListType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return List.findByIdAndRemove(args.id);
      },
    },
    deleteTodo: {
      type: TodoType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Todo.findByIdAndRemove(args.id);
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation,
});
