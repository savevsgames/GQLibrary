import { Schema, model, type Document } from "mongoose";

import {bookSchema, type IBookDocument} from "./BookGQL";

export interface IUserDocument extends Document {
  username: string;
  email: string;
  password: string;
  savedBooks: IBookDocument[];
  bookCount: number;
}

const userSchema = new Schema<IUserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    savedBooks: [bookSchema]
      // {
      //   type: Schema.Types.ObjectId,
      //   ref: "Book",
      // },
    //],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

const User = model<IUserDocument>("User", userSchema);

export default User;
