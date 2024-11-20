import type { Request } from "express";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

if (!SECRET_KEY) {
  console.error("JWT_SECRET_KEY is not defined in the environment");
  process.exit(1);
}

export const authenticateToken = async (req: Request) => {
  if (!req || !req.headers) {
    console.log("Server Auth - Request or headers missing in context");
    return { user: null }; // Return a default context
  }

  let token = req.body.token || req.query.token || req.headers.authorization;

  // Extract token if authorization header exists
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ").pop()?.trim();
  }

  if (!token) {
    console.log("Server Auth- No token provided, returning null user...");
    return { user: null }; // Return a default context
  }

  try {
    const { data }: any = jwt.verify(token, `${SECRET_KEY}`, {
      maxAge: "2h",
    });
    console.log("Server Auth - Token verified - returning user data: ", data);
    return { user: data };
  } catch (error) {
    console.error("Invalid Token", error);
    return { user: null }; // Return a default context
  }
};

export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id };
  const secretKey: any = process.env.JWT_SECRET_KEY;

  return jwt.sign({ data: payload }, secretKey, { expiresIn: "2h" });
};

export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, undefined, undefined, undefined, ["UNAUTHENTICATED"]);
    Object.defineProperty(this, "name", { value: "AuthenticationError" });
  }
}
