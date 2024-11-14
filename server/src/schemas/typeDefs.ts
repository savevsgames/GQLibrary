const typeDefs = `
  type Book {
    _id: ID!
    bookId: String!
    title: String!
    authors: [String]!
    description: String
    image: String
    link: String
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
    bookCount: Int
  }

  type Auth {
    token: ID!
    user: User!
  }

  type Query {
    me: User
    books(username: String): [Book]
    book(bookId: ID!): Book
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  input BookInput {
    bookId: String!
    title: String!
    authors: [String]!
    description: String
    image: String
    link: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(userData: UserInput!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(bookId: ID!): User
  }
`;

export default typeDefs;
