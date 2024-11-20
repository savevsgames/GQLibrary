import express from "express";
import cors from "cors";
import path from "node:path";
import type { Request, Response } from "express";
import db from "./config/connection.js";
// import { createTestToken, verifyTestToken } from "./utils/tempToken.js";
// import { JwtPayload } from "jsonwebtoken";
// Import ApolloServer
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { authenticateToken } from "./utils/auth.js";
// Import our typeDefs and resolvers
import { typeDefs, resolvers } from "./schemas/index.js";

import { fileURLToPath } from "url";

// Create a new ApolloServer and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error) => {
    // log errors to the console
    console.error(error);
    return error;
  },
});

// startApolloServer
const startApolloServer = async () => {
  await server.start();
  await db();

  const PORT = process.env.PORT || 3001;
  const app = express();

  const allowedOrigins =
    process.env.NODE_ENV === "production"
      ? ["https://stunning-nasturtium-ba3d98.netlify.app"] // Remove trailing slash
      : ["http://localhost:3000"]; // Local development

  app.use(
    cors({
      // callback is a function that takes two arguments: error and options
      // we use it here to check if the origin is in the allowedOrigins array and allow origin of null to pass
      origin: function (origin, callback) {
        // Allow requests with no origin (e.g., mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
          return callback(null, true);
        } else {
          return callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
    })
  );

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // app.use(
  //   "/graphql",
  //   expressMiddleware(server as any, {
  //     context: authenticateToken as any,
  //   })
  // );

  app.use(
    "/graphql",
    expressMiddleware(server as any, {
      context: async ({ req }) => {
        const authContext = await authenticateToken(req);
        console.log("Server - Context generated:", authContext);
        return authContext; // Always return an object, even if authentication fails
      },
    })
  );

  // app.use(
  //   "/graphql",
  //   expressMiddleware(server, {
  //     context: async ({ req }) => {
  //       // Get the token from the request headers
  //       const token = req.headers.authorization || "";

  //       // If no token, create a test token
  //       const finalToken = token || createTestToken();

  //       // Verify the token
  //       const decoded = verifyTestToken(finalToken);

  //       // If token is valid, attach user to context
  //       if (decoded) {
  //         return {
  //           user: (decoded as JwtPayload).data,
  //         };
  //       }

  //       return {};
  //     },
  //   })
  // );

  // Get the __dirname equivalent
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // if we're in production, serve client/dist as static assets
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, "../client/build/index.html"));
    });
  }

  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();
