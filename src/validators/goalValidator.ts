import { body } from "express-validator";

export const createGoalSchema = [
  body('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('must enter the name.'),
];