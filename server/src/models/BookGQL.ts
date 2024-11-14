import { Schema, type Document } from "mongoose";

export interface IBookDocument extends Document {
  bookId: string;
  title: string;
  authors: string[];
  description: string;
  image: string;
  link: string;
}

export const bookSchema = new Schema<IBookDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    authors: [
      {
        type: String,
        required: true,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    // saved book id from GoogleBooks
    bookId: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    link: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

// const Book = model<IBookDocument>("Book", bookSchema);
