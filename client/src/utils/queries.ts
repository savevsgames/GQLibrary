import { gql } from "@apollo/client";

// getUsers query constructor
// export const GET_USERS = gql`
//   query getUsers {
//     users {
//       _id
//       username
//       email
//       bookCount
//       savedBooks {
//         bookId
//         authors
//         description
//         title
//         image
//         link
//       }
//     }
//   }
// `;

// // getUser query constructor by userId
// export const GET_USER = gql`
//   query getUser($userId: ID!) {
//     user(userId: $userId) {
//       _id
//       username
//       email
//       bookCount
//       savedBooks {
//         bookId
//         authors
//         description
//         title
//         image
//         link
//       }
//     }
//   }
// `;

// // getBooks query constructor
// export const GET_BOOKS = gql`
//   query getBooks {
//     books {
//       _id
//       authors
//       description
//       title
//       image
//       link
//     }
//   }
// `;

// // getBook query constructor
// export const GET_BOOK = gql`
//   query getBook($bookId: ID!) {
//     book(bookId: $bookId) {
//       _id
//       authors
//       description
//       title
//       image
//       link
//     }
//   }
// `;

// getMe query constructor
export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
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
