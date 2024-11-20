// import { gql } from "apollo-server-express";

const typeDefs = `
  type Book {
    bookId: String!
    title: String!
    authors: [String]
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
    user: User
  }

  type Query {
    me: User
    books(userId: ID!): [Book]
    book(bookId: String!): Book
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  input BookInput {
    bookId: String!
    title: String!
    authors: [String]
    description: String
    image: String
    link: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(userInput: UserInput!): Auth
    addBook(bookInput: BookInput!): User
    removeBook(bookId: String!): User
  }
`;

export default typeDefs;
