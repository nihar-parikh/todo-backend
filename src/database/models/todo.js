import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;

//----------Declaring all ToDo Model constants---------------//
export const TITLE = "title";
export const IS_COMPLETE = "isComplete";

const ToDoSchema = new Schema(
  {
    [TITLE]: {
      type: String,
      required: [true, "Please Enter Title"],
      maxLength: [80, "Title cannot exceed 80 characters"],
      minLength: [4, "Title should have more than 4 characters"],
      unique: true,
    },
    [IS_COMPLETE]: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const ToDoModel = model("ToDo", ToDoSchema);

export { ToDoModel };
