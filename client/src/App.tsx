import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Construct a new Apollo HttpLink that connects to our GraphQL API
const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql", // Full URL to the local GraphQL server - http://localhost:3001/graphql
});

// Construct a new Apollo Link that adds the token to every request
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token") || "";

  // Return the ...headers with the authToken to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Combine the links
  link: authLink.concat(httpLink),
  // Use the cache as normal
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;
