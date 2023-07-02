import { CustomError } from "./CustomError.js";

const developmentErrors = (error, res) => {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    stackTrace: error.stack,
    error: error,
  });
};

const castErrorHandler = (error) => {
  const errorMessage = `Invalid value ${error.value} for field ${error.path}`;
  return new CustomError(errorMessage, 400);
};

const duplicateKeyErrorHandler = (error) => {
  const title = error.keyValue.title;
  const errorMessage = `There is already a ToDo with title ${title}. Please use another title!`;

  return new CustomError(errorMessage, 400);
};

const validationErrorHandler = (error) => {
  const errors = Object.values(error.errors).map((value) => value.message);
  const errorMessages = errors.join(". ");
  const errorMessage = `Invalid input data: ${errorMessages}`;

  return new CustomError(errorMessage, 400);
};

const productionErrors = (error, res) => {
  //on production we only show operational errors
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    //for non operational errors
    res.status(500).json({
      status: "error",
      message: "Something went wrong! Please try later",
    });
  }
};

export const globalErrorHandler = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (process.env.NODE_ENV === "development") {
    if (error.name === "CastError") {
      error = castErrorHandler(error);
    }
    //for duplicate key name property doesn't come
    //as it is mongodb error and not mongoose error.
    //it has error code = 11000
    if (error.code === 11000) {
      error = duplicateKeyErrorHandler(error);
    }
    if (error.name === "ValidationError") {
      error = validationErrorHandler(error);
    }
    developmentErrors(error, res);
  } else if (process.env.NODE_ENV === "production") {
    if (error.name === "CastError") {
      error = castErrorHandler(error);
    }
    //for duplicate key name property doesn't come
    //as it is mongodb error and not mongoose error.
    //it has error code = 11000
    if (error.code === 11000) {
      error = duplicateKeyErrorHandler(error);
    }
    if (error.name === "ValidationError") {
      error = validationErrorHandler(error);
    }
    productionErrors(error, res);
  }
};
