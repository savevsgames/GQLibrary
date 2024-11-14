const typeDefs = `
    type Book {
        _id: ID
        title: String
        authors: [String]
        description: String
        image: String
        link: String
    }

    type User {
        _id: ID
        username: String
        email: String
        password: String
        savedBooks: [Book]
        bookCount: Int
    }

    type Query {
        users: [User]
        books(userId: ID!): [Book]
        user(userID: ID!): User  
        book(bookID: ID!): Book   
    }
`;

export default typeDefs;
