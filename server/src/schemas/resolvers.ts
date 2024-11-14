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
        // If not authenticated, throw an authentication error
        throw new AuthenticationError("Not Authenticated");
      }
      const userData = await User.findOne({ _id: context.user._id }) // Find the user by _id
        .select("-__v -password") // Exclude the __v and password fields
        .lean(); // Convert Mongoose document to plain JavaScript object

      if (!userData) {
        throw new GraphQLError("User not found"); // Auth worked but user not found?
      }
      // Return the user data (ie the me query)
      return userData;
    },
    books: async (
      _parent: unknown,
      { _id }: UserArgs,
      context: Context
    ): Promise<Book[] | null> => {
      if (context.user) {
        return await User.findOne(
          { _id: _id },
          { savedBooks: 1, _id: 0 } // Only return savedBooks field / _id: 0 means don't return _id field
        );
      }
      // If not authenticated, throw an authentication error
      throw new AuthenticationError("Not Authenticated");
    },
    book: async (_parent: unknown, { bookID }: BookArgs) => {
      return await Book.findOne({ _id: bookID });
    },
  },
};

export default resolvers;
