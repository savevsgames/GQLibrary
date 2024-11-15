import { GraphQLError } from "graphql";
import { User } from "../models";
import { BookDocument } from "../models/BookGQL";
import { UserDocument } from "../models/UserGQL";
import { signToken, AuthenticationError } from "../utils/auth.js";

// Not sure if authors should be guaranteed! or optional ? - I think it should be optional

interface BookInput {
  bookId: string;
  title: string;
  authors: string[];
  description: string;
  image?: string;
  link?: string;
}

interface UserInput {
  username: string;
  email: string;
  password: string;
}

interface Context {
  user?: {
    _id: string;
    username: string;
    email: string;
  };
}

const resolvers = {
  Query: {
    me: async (
      _parent: unknown,
      _args: unknown,
      context: Context
    ): Promise<User | null> => {
      if (!context.user) {
        console.log("Not Authenticated");
        // If not authenticated, throw an authentication error
        throw new AuthenticationError("Not Authenticated");
      }
      const userData = await User.findOne({ _id: context.user._id }) // Find the user by _id
        .select("-__v -password") // Exclude the __v and password fields
        .lean(); // Convert Mongoose document to plain JavaScript object

      if (!userData) {
        console.log("User not found");
        throw new GraphQLError("User not found"); // Auth worked but user not found?
      }
      // Return the user data (ie the me query)
      return userData;
    },
    books: async (
      _parent: unknown,
      { userId }: { userId?: string },
      context: Context
    ) => {
      try {
        const searchId = userId || context.user?._id; // userId from params or context.user._id

        if (!searchId) {
          throw new GraphQLError("User Id is required");
        }

        const userData = await User.findById(searchId).select("savedBooks"); // Find the user by the params object and only return the savedBooks field

        if (!userData) {
          throw new GraphQLError("User not found");
        }

        // Return the savedBooks array if user is found
        return userData.savedBooks;
      } catch (err) {
        console.log("Authentication Error: ", err);
        // If not authenticated, throw an authentication error
        throw new AuthenticationError("Not Authenticated");
      }
    },
  },
};

export default resolvers;
