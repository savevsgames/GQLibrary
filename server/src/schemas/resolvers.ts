import Book from "../models/BookGQL";
import User from "../models/UserGQL";

interface UserArgs {
  userID: string;
}

interface BookArgs {
  bookID: string;
}

const resolvers = {
  Query: {
    users: async () => {
      return await User.find().sort({ username: 1 });
    },
    user: async (_parent: unknown, { userID }: UserArgs) => {
      return await User.findOne({ _id: userID });
    },
    books: async (_parent: unknown, { userID }: UserArgs) => {
      return await Book.find({ userId: userID });
    },
    book: async (_parent: unknown, { bookID }: BookArgs) => {
      return await Book.findOne({ _id: bookID });
    },
  },
};

export default resolvers;
