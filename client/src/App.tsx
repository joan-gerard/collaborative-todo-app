import React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Header from "./components/Header";
import Lists from "./components/Lists";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        lists: {
          merge(_existing, incoming) {
            return incoming;
          },
        },
        todos: {
          merge(_existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className="container">
          <Lists />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
