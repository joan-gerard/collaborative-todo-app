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
import { resolve } from "path";

// Types
const TodoType = new GraphQLObjectType({
  name: "Todo",
  fields: () => ({
    id: { type: GraphQLID },
    // title: { type: GraphQLString },
    content: { type: GraphQLString },
    deadline: { type: GraphQLString },
    priority: { type: GraphQLString },
    status: { type: GraphQLString },
    list: {
      type: ListType,
      resolve(parent, args) {
        return List.findById(parent.listId);
      },
    },
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
        // title: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) },
        deadline: { type: GraphQLString },
        priority: {
          type: new GraphQLEnumType({
            name: "TodoPriority",
            values: {
              low: { value: "Low" },
              medium: { value: "Medium" },
              high: { value: "High" },
            },
          }),
          // defaultValue: "Low",
        },
        status: {
          type: new GraphQLEnumType({
            name: "TodoStatus",
            values: {
              pending: { value: "Pending" },
              done: { value: "Done" },
            },
          }),
        },
        listId: { type: GraphQLID },
      },
      resolve(parent, args) {
        const todo = new Todo({
          title: args.title,
          content: args.content,
          deadline: args.deadline,
          priority: args.priority,
          status: args.status,
          listId: args.listId,
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
    updateTodo: {
      type: TodoType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        deadline: { type: GraphQLString },
        priority: {
          type: new GraphQLEnumType({
            name: "TodoPriorityUpdate",
            values: {
              low: { value: "Low" },
              medium: { value: "Medium" },
              high: { value: "High" },
            },
          }),
        },
        status: {
          type: new GraphQLEnumType({
            name: "TodoStatusUpdate",
            values: {
              pending: { value: "Pending" },
              done: { value: "Done" },
            },
          }),
        },
        listId: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Todo.findByIdAndUpdate(
          args.id,
          {
            $set: {
              title: args.title,
              content: args.content,
              deadline: args.deadline,
              priority: args.priority,
              status: args.status,
              listId: args.listId,
            },
          },
          { new: true }
        );
      },
    },
    updateTodoContent: {
      type: TodoType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        content: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Todo.findByIdAndUpdate(
          args.id,
          {
            $set: {
              content: args.content,
            },
          },
          { new: true }
        );
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation,
});
