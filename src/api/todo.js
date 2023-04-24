import { ToDoService } from "../services/todo-service.js";
import { TITLE } from "../database/models/todo.js";
import { validationResult } from "express-validator";
import {
  createToDoValidations,
  deleteToDoValidations,
  getToDoByIDValidations,
  updateStatusToDoValidations,
  updateToDoValidations,
} from "../utils/validation-errors.js";
import { BASE_URL } from "../utils/index.js";

const todos = (app) => {
  const toDoService = new ToDoService();

  //------------------Create ToDo Api-----------------//
  app.post(
    `${BASE_URL}/create`,
    [...createToDoValidations],
    async (req, res, next) => {
      try {
        const { [TITLE]: title } = req.body;

        // validationResult function checks whether
        // any occurs or not and return an object
        const errors = validationResult(req);

        // If some error occurs, then this
        // block of code will run
        if (!errors.isEmpty()) {
          return res.json(errors);
        }

        //--------------Calling createToDo method------------//
        const { data } = await toDoService.createToDo({
          title,
        });
        return res.json({
          data,
          message: data.error ? "To Do already exist." : "To Do created.",
        });
      } catch (err) {
        next(err);
      }
    }
  );

  //------------------Get all ToDos Api-----------------//
  app.get(`${BASE_URL}/all`, async (req, res, next) => {
    try {
      //--------------Calling getAllToDos method------------//
      const { data } = await toDoService.getAllToDos();
      return res.status(200).json({ data, message: "" });
    } catch (err) {
      next(err);
    }
  });

  //------------------Get ToDo by ID Api-----------------//
  app.post(
    `${BASE_URL}`,
    [...getToDoByIDValidations],
    async (req, res, next) => {
      try {
        const { id } = req.body;
        // validationResult function checks whether
        // any occurs or not and return an object
        const errors = validationResult(req);

        // If some error occurs, then this
        // block of code will run
        if (!errors.isEmpty()) {
          return res.json(errors);
        }

        //--------------Calling getToDoByID method------------//
        const { data } = await toDoService.getToDoByID(id);
        return res.status(200).json({ data, message: "" });
      } catch (err) {
        next(err);
      }
    }
  );

  //------------------Update ToDo Api-----------------//
  app.put(`${BASE_URL}`, [...updateToDoValidations], async (req, res, next) => {
    try {
      const { id, title } = req.body;

      // validationResult function checks whether
      // any occurs or not and return an object
      const errors = validationResult(req);

      // If some error occurs, then this
      // block of code will run
      if (!errors.isEmpty()) {
        return res.json(errors);
      }

      //--------------Calling updateToDo method------------//
      const { data } = await toDoService.updateToDo({ id, title });
      return res.status(200).json({ data, message: "To Do updated." });
    } catch (err) {
      next(err);
    }
  });

  //------------------Update ToDo Api-----------------//
  app.put(
    `${BASE_URL}/status-update`,
    [...updateStatusToDoValidations],
    async (req, res, next) => {
      try {
        const { id, isComplete } = req.body;

        // validationResult function checks whether
        // any occurs or not and return an object
        const errors = validationResult(req);

        // If some error occurs, then this
        // block of code will run
        if (!errors.isEmpty()) {
          return res.json(errors);
        }

        //--------------Calling updateToDoStatus method------------//
        const { data } = await toDoService.updateToDoStatus({ id, isComplete });
        return res.status(200).json({ data, message: "To Do status updated." });
      } catch (err) {
        next(err);
      }
    }
  );

  //------------------Delete ToDo Api-----------------//
  app.delete(
    `${BASE_URL}`,
    [...deleteToDoValidations],
    async (req, res, next) => {
      try {
        const { id } = req.body;

        // validationResult function checks whether
        // any occurs or not and return an object
        const errors = validationResult(req);

        // If some error occurs, then this
        // block of code will run
        if (!errors.isEmpty()) {
          return res.json(errors);
        }

        //--------------Calling deleteToDo method------------//
        const { data } = await toDoService.deleteToDo(id);
        return res.status(200).json({ data: null, message: "To Do deleted." });
      } catch (err) {
        next(err);
      }
    }
  );
};

export { todos };
