// utils/errors.js
import { AppError } from "./AppError.js";

export class NotFoundError extends AppError {
  constructor(resource = "Resource") {
    super(`${resource} not found`, 404);
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Bad request") {
    super(message, 400);
  }
}

// export class UnauthorizedError extends AppError {
//   constructor() {
//     super("Unauthorized", 401);
//   }
// }
