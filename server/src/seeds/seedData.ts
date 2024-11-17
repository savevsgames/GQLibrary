export const bookSeedData: Array<{
  bookId: string;
  title: string;
  authors: string[];
  description: string;
  image: string;
  link: string;
}> = [
  {
    bookId: "001",
    title: "The Great Gatsby",
    authors: ["F. Scott Fitzgerald"],
    description:
      "A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
    image: "https://example.com/gatsby.jpg",
    link: "https://example.com/great-gatsby",
  },
  {
    bookId: "002",
    title: "1984",
    authors: ["George Orwell"],
    description:
      "A dystopian social science fiction novel and cautionary tale.",
    image: "https://example.com/1984.jpg",
    link: "https://example.com/1984",
  },
  {
    bookId: "003",
    title: "To Kill a Mockingbird",
    authors: ["Harper Lee"],
    description:
      "The story of racial injustice and the loss of innocence in the American South.",
    image: "https://example.com/mockingbird.jpg",
    link: "https://example.com/to-kill-a-mockingbird",
  },
  {
    bookId: "004",
    title: "The Hobbit",
    authors: ["J.R.R. Tolkien"],
    description:
      "A fantasy novel about the adventures of home-loving hobbit Bilbo Baggins.",
    image: "https://example.com/hobbit.jpg",
    link: "https://example.com/the-hobbit",
  },
];

export const userSeedData: Array<{
  username: string;
  email: string;
  password: string;
  savedBooks: Array<{
    bookId: string;
    title: string;
    authors: string[];
    description: string;
    image: string;
    link: string;
  }>;
}> = [
  {
    username: "bookworm1",
    email: "bookworm1@example.com",
    password: "password123",
    savedBooks: [bookSeedData[0], bookSeedData[1]],
  },
  {
    username: "readingPro",
    email: "reader@example.com",
    password: "password456",
    savedBooks: [bookSeedData[2]],
  },
  {
    username: "libraryLover",
    email: "library@example.com",
    password: "password789",
    savedBooks: [bookSeedData[0], bookSeedData[2], bookSeedData[3]],
  },
];
