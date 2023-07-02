class CustomError extends Error {
  constructor(errorMessage, statusCode) {
    //by calling super() it will instantiate constructor or Error class and there we pass errorMessage
    super(errorMessage);
    this.statusCode = statusCode;
    this.status = this.status =
      statusCode >= 400 && statusCode < 500 ? "failed" : "error";

    //all CustomErrot is for all operational errors
    this.isOperational = true;

    //gives the exact path of error
    Error.captureStackTrace(this, this.constructor);
  }
}

export { CustomError };
