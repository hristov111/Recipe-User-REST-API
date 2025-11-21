import Router from "express";
import {
  getRecipeController,
  createRecipeController,
  getUserRecipesController,
  updateRecipeController,
  deleteUserRecipeController,
} from "../controllers/recipe.controller";
import { createRecipeValidator } from "../validations/recipe.validations";
import { authMiddleware } from "../middleware/auth.middleware";
import { validateRequest } from "../middleware/validate.middleware";
const router = Router();

// this is an admin function
router.get("/", getRecipeController);
router.post(
  "/createRecipe",
  authMiddleware,
  createRecipeValidator,
  validateRequest,
  createRecipeController
);

router.delete("/:recipeId", authMiddleware, deleteUserRecipeController);
router.put(
  "/:recipeId",
  authMiddleware,
  createRecipeValidator,
  validateRequest,
  updateRecipeController
);
router.get("/getUserRecipes", authMiddleware, getUserRecipesController);

export default router;
