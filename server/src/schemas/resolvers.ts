import { GraphQLError } from "graphql";
import User from "../models/UserGQL.js";
// import { bookSchema } from "../models/BookGQL";
// import { IUserDocument } from "../models/UserGQL";
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
    me: async (_parent: unknown, _args: unknown, context: Context) => {
      try {
        if (!context.user) {
          throw new AuthenticationError("Sorry, Authentication Failed");
        }
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .lean();

        if (!userData) {
          throw new GraphQLError("User not found");
        }
        // Return the user data if user is found
        return userData;
      } catch (error) {
        console.log("Authentication Error: ", error);
        throw new AuthenticationError("Sorry, Authentication Failed");
      }
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
      } catch (error) {
        console.log("Authentication Error: ", error);
        // If not authenticated, throw an authentication error
        throw new AuthenticationError("Sorry, Authentication Failed");
      }
    },
    // Get a single book by bookId (googleBooksId)
    book: async (
      _parent: unknown,
      { bookId }: { bookId: string },
      context: Context
    ) => {
      try {
        // If not authenticated, throw an authentication error
        if (!context.user) {
          throw new AuthenticationError("Sorry, Authentication Failed");
        }
        // Find the user by the context user _id and only return the savedBooks field
        const userData = await User.findOne({ _id: context.user._id }).select(
          "savedBooks"
        );
        // If user not found, throw a GraphQLError instead because auth worked
        if (!userData) {
          throw new GraphQLError("User not found");
        }
        // Find the book in the savedBooks array by bookId
        const book = userData.savedBooks.find(
          (book: { bookId: string }) => book.bookId === bookId
        );

        if (!book) {
          throw new GraphQLError("Book not found");
        }
        // If book is found, return the book <IBookDocument>
        return book;
      } catch (error) {
        // Log the error and throw an authentication error
        console.log("Authentication Error: ", error);
        throw new AuthenticationError("Sorry, Authentication Failed");
      }
    },
  },
  Mutation: {
    // Create an account
    addUser: async (_parent: unknown, args: { userInput: UserInput }) => {
      try {
        const user = await User.create(args.userInput);
        // Create a token with the user data
        const token = signToken(user.username, user.email, user._id);
        // Return the token and user data
        return { token, user };
      } catch (error) {
        console.log("Error creating user: ", error);
        throw new GraphQLError("Error creating user");
      }
    },
    login: async (
      _parent: unknown,
      { email, password }: { email: string; password: string }
    ) => {
      try {
        const user = await User.findOne({
          email,
        });

        if (!user) {
          throw new AuthenticationError("Sorry, Authentication Failed");
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          throw new AuthenticationError("Sorry, Authentication Failed");
        }

        const token = signToken(user.username, user.email, user._id);

        return { token, user };
      } catch (error) {
        console.log("Error logging in: ", error);
        throw new AuthenticationError("Sorry, Authentication Failed");
      }
    },
    // Save a book to a user's account
    addBook: async (
      _parent: unknown,
      { bookInput }: { bookInput: BookInput },
      context: Context
    ) => {
      try {
        if (!context.user) {
          throw new AuthenticationError("Sorry, Authentication Failed");
        }

        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: bookInput } }, // Add the book to the savedBooks array
          { new: true } // Return the updated user
        );

        if (!updatedUser) {
          throw new GraphQLError("User not found");
        }
        // Return the updated user with the new book added
        return updatedUser;
      } catch (error) {
        console.log("Authentication Error: ", error);
        throw new AuthenticationError("Sorry, Authentication Failed");
      }
    },
    removeBook: async (
      _parent: unknown,
      { bookId }: { bookId: string },
      context: Context
    ) => {
      try {
        if (!context.user) {
          throw new AuthenticationError("Sorry, Authentication Failed");
        }

        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } }, // Remove the book from the savedBooks array
          { new: true } // Return the updated user
        );

        if (!updatedUser) {
          throw new GraphQLError("User not found");
        }
        // Return the updated user with the book removed
        return updatedUser;
      } catch (error) {
        console.log("Authentication Error: ", error);
        throw new AuthenticationError("Sorry, Authentication Failed");
      }
    },
  },
};

export default resolvers;
