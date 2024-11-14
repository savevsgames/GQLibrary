import type { Request, Response, NextFunction } from "express";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

export const authenticateToken = (req: Request) => {
  let token = req.body.token || req.query.token || req.headers.authorization;
  // Extract token from header if authorization header is present
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ").pop()?.trim();
  }

  if (!token) {
    // throw new GraphQLError("Token not provided");
    return req;
  }

  try {
    const { data }: any = jwt.verify(token, process.env.JWT_SECRET_KEY || "", {
      maxAge: "1hr",
    });
    // if the token is valid attach the user data to the request object
    req.user = data;
  } catch (error) {
    // throw new GraphQLError("Invalid token");
    console.log("Invalid Token", error);
  }

  // Return the request object (with or without the user appended)
  return req;
};

export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id };
  const secretKey: any = process.env.JWT_SECRET_KEY;

  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};

export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, undefined, undefined, undefined, ["UNAUTHENTICATED"]);
    Object.defineProperty(this, "name", { value: "AuthenticationError" });
  }
}
