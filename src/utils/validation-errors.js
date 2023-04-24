import { check, validationResult } from "express-validator";

export const createToDoValidations = [
  check("title", "Title should be 4 to 80 characters").isLength({
    min: 4,
    max: 80,
  }),
];

export const getToDoByIDValidations = [check("id", "Invalid ID").isMongoId()];

export const updateToDoValidations = [
  check("id", "Invalid ID").isMongoId(),
  check("title", "Title should be 4 to 80 characters").isLength({
    min: 4,
    max: 80,
  }),
];

export const updateStatusToDoValidations = [
  check("id", "Invalid ID").isMongoId(),
  check("isComplete", "isComplete should be Boolean").isBoolean(),
];

export const deleteToDoValidations = [check("id", "Invalid ID").isMongoId()];
