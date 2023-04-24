import { json, urlencoded } from "express";
import cors from "cors";
import { todos } from "./api/index.js";
import { ErrorHandler } from "./utils/error-handler.js";

const expressApp = async (app) => {
  app.use(json({ limit: "1mb" }));
  app.use(urlencoded({ extended: true, limit: "1mb" }));
  app.use(cors());

  //-------------all apis-------------//
  todos(app);

  //--------------error handling--------//
  app.use(ErrorHandler);
};

export { expressApp };
