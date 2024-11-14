const typeDefs = `
    type Book {
        bookId: String
        title: String
        authors: [String]
        description: String
        image: String
        link: String
    }

    type User {
        _id: ID!
        username: String
        email: String
        password: String
        savedBooks: [Book]
        bookCount: Int
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        books(userId: ID!): [Book]
        book(bookId: ID!): Book
    }
`;

export default typeDefs;
