import { body, param } from "express-validator";

export const createRecipeValidator = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("instructions").notEmpty().withMessage("Instructions is required"),
  body("ingredients")
    .notEmpty()
    .withMessage("Ingredients must contain atleast one item"),
  body("cookingTime")
    .isNumeric()
    .withMessage("CookingTime must be of type number"),
];

export const updateRecipeValidator = [
  param("recipeId")
    .notEmpty()
    .withMessage("RecipeId required")
    .isString()
    .optional()
    .withMessage("RecipeId must be a string"),
  body("title").optional().notEmpty().withMessage("Title is required"),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("Description is required"),
  body("instructions")
    .optional()
    .notEmpty()
    .withMessage("Ingrediesnt is required"),
  body("ingredients")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Ingredients must be an array with atleast one item"),
  body("cookingTime")
    .optional()
    .isNumeric()
    .withMessage("CookingTime must be of type number"),
];
