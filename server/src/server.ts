import express from "express";
import path from "node:path";
import db from "./config/connection.js";

// Import ApolloServer
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

// Import our typeDefs and resolvers
import { typeDefs, resolvers } from "./schemas/index.js";

// Create a new ApolloServer and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// startApolloServer
const startApolloServer = async () => {
  await server.start();
  await db();

  const PORT = process.env.PORT || 3001;
  const app = express();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use("/graphql", expressMiddleware(server));

  // if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));

    app.get("*", (_req, res) => {
      res.sendFile(path.join(__dirname, "../client/build/index.html"));
    });
  }


  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();
