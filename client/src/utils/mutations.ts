import { gql } from "@apollo/client";

// addBook mutation constructor userID and Book
export const ADD_BOOK = gql`
  mutation addBook($book: BookInput!) {
    addBook(book: $book) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;
