import { APIError } from "../utils/app-errors.js";
import { ToDoRepository } from "../database/index.js";
import { formatData } from "../utils/index.js";

//---------All Business logic will be here--------//
class ToDoService {
  constructor() {
    this.repository = new ToDoRepository();
  }

  //-----------------createToDo Method----------------//

  async createToDo(toDoInputs) {
    try {
      const toDoResult = await this.repository.createToDo(toDoInputs);
      return formatData(toDoResult);
    } catch (err) {
      throw new APIError("Unable to create To Do");
    }
  }

  // //-----------------getPostsByLocation Method----------------//
  // async getPostsByLocation({ latitude, longitude }) {
  //   try {
  //     const posts = await this.repository.postsByLocation({
  //       latitude,
  //       longitude,
  //     });
  //     return formatData(posts);
  //   } catch (err) {
  //     throw new APIError("Data Not found");
  //   }
  // }

  // //-----------------getPostsByStatus Method----------------//
  // async getPostsByStatus(active) {
  //   try {
  //     const posts = await this.repository.postsByStatus(active);
  //     return formatData(posts);
  //   } catch (err) {
  //     throw new APIError("Data Not found");
  //   }
  // }

  //-----------------getAllToDos Method----------------//
  async getAllToDos() {
    try {
      const todos = await this.repository.allToDos();
      return formatData(todos);
    } catch (err) {
      throw new APIError("Data Not found");
    }
  }

  //-----------------getToDoByID Method----------------//
  async getToDoByID(id) {
    try {
      const todo = await this.repository.getToDo(id);
      return formatData(todo);
    } catch (err) {
      throw new APIError("Data Not found");
    }
  }

  //-----------------updateToDo Method----------------//
  async updateToDo({ id, title }) {
    try {
      const todo = await this.repository.updateToDo({ id, title });
      return formatData(todo);
    } catch (err) {
      throw new APIError("Data Not found");
    }
  }

  //-----------------updateToDoStatus Method----------------//
  async updateToDoStatus({ id, isComplete }) {
    try {
      const todo = await this.repository.updateToDoStatus({ id, isComplete });
      return formatData(todo);
    } catch (err) {
      throw new APIError("Data Not found");
    }
  }

  //-----------------deleteToDo Method----------------//
  async deleteToDo(id) {
    try {
      const todo = await this.repository.deleteToDo(id);
      return formatData(todo);
    } catch (err) {
      throw new APIError("Data Not found");
    }
  }
}

export { ToDoService };
