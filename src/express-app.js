import { json, urlencoded } from "express";
import cors from "cors";
import { todos } from "./api/index.js";
import { ErrorHandler } from "./utils/error-handler.js";
import { CustomError } from "./utils/CustomError.js";
import { globalErrorHandler } from "./utils/globalErrorHandler.js";

const expressApp = async (app) => {
  app.use(json({ limit: "1mb" }));
  app.use(urlencoded({ extended: true, limit: "1mb" }));
  app.use(cors());

  //-------------all apis-------------//
  todos(app);

  //--------------For invalid route--------//
  //--------------Always at the end of all routes defined--------//
  app.use("*", (req, res, next) => {
    // res.status(404).json({
    //   status: "failed",
    //   message: `Can't find ${req.originalUrl} on the server`,
    // });

    // const error = new Error(`Can't find ${req.originalUrl} on the server`);
    // error.status = "failed";
    // error.statusCode = 404;
    // next(error); //if passed any arguments in next() then it will bypass all middleware and goes to error middleware.

    const error = new CustomError(
      `Can't find ${req.originalUrl} on the server`,
      404
    );
    next(error); //if passed any arguments in next() then it will bypass all middleware and goes to error middleware.
  });

  //--------------error handling--------//
  // app.use(ErrorHandler);

  // app.use((error, req, res, next) => {
  //   error.statusCode = error.statusCode || 500;
  //   error.status = error.status || "error";

  //   res.status(error.statusCode).json({
  //     status: error.status,
  //     message: error.message,
  //   });
  // });
  //replacing the above function into global function/handler/controller/middleware
  app.use(globalErrorHandler);
};

export { expressApp };
