import { ToDoModel, TITLE } from "../models/todo.js";
import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from "../../utils/app-errors.js";

//---------Dealing with data base operations----------//
class ToDoRepository {
  //----------createToDo Method-------//
  async createToDo({ title }) {
    try {
      const existingToDo = await ToDoModel.findOne({ title });
      if (existingToDo) {
        return {
          error: "To Do already exist",
        };
      }
      const newToDo = new ToDoModel({
        [TITLE]: title,
      });
      const toDoResult = await newToDo.save();

      return toDoResult;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create To Do"
      );
    }
  }

  // //----------postsByLocation Method-------//
  // async postsByLocation({ latitude, longitude }) {
  //   try {
  //     return await postModel.find({
  //       [LATITUDE]: latitude,
  //       [LONGITUDE]: longitude,
  //     });
  //   } catch (err) {
  //     throw APIError(
  //       "API Error",
  //       STATUS_CODES.INTERNAL_ERROR,
  //       "Unable to Get Posts"
  //     );
  //   }
  // }

  // //----------postsByStatus Method-------//
  // async postsByStatus(active) {
  //   try {
  //     return await postModel.aggregate([
  //       {
  //         $match: {
  //           [ACTIVE]: active,
  //         },
  //       },
  //       {
  //         $count: active ? "activePosts" : "inActivePosts",
  //       },
  //     ]);
  //   } catch (err) {
  //     throw APIError(
  //       "API Error",
  //       STATUS_CODES.INTERNAL_ERROR,
  //       "Unable to Get Posts"
  //     );
  //   }
  // }

  //----------allToDos Method-------//
  async allToDos() {
    try {
      return await ToDoModel.find();
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Get ToDos"
      );
    }
  }

  //----------getToDo Method-------//
  async getToDo(id) {
    try {
      return await ToDoModel.findById(id);
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Get ToDo"
      );
    }
  }

  //----------updateToDo Method-------//
  async updateToDo({ id, title }) {
    try {
      const todo = await ToDoModel.findOneAndUpdate(
        { _id: id },
        { title: title },
        { new: true }
      );
      return todo;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to upadte ToDo"
      );
    }
  }

  //----------updateToDoStatus Method-------//
  async updateToDoStatus({ id, isComplete }) {
    try {
      const todo = await ToDoModel.findOneAndUpdate(
        { _id: id },
        { isComplete: isComplete },
        { new: true }
      );
      return todo;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to update ToDo status"
      );
    }
  }

  //----------deleteToDo Method-------//
  async deleteToDo(id) {
    try {
      return await ToDoModel.findByIdAndDelete(id);
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to delete ToDo"
      );
    }
  }
}

export { ToDoRepository };
