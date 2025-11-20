import Router, { Request, Response } from "express";
import {
  getAllRecipes,
  createRecipe,
  getUserRecipes,
  updateRecipe,
  deleteRecipe,
} from "../services/recipe.services";
import { checkInvalidFields } from "../utils/others";
const router = Router();

const allowedFields = [
  "title",
  "discription",
  "ingredients",
  "instructions",
  "cookingTime",
];

export const getRecipeController = async (req: Request, res: Response) => {
  try {
    const recipes = await getAllRecipes();
    return res.status(200).json({ recipes: recipes });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createRecipeController = async (req: Request, res: Response) => {
  try {
    if (!req.userId) return res.status(400).json({ message: "Unauthorized" });

    const { title, description, ingredients, instructions, cookingTime } =
      req.body;
    const newRecipe = await createRecipe(req.userId, {
      title,
      description,
      ingredients,
      instructions,
      cookingTime,
    });

    return res
      .status(201)
      .json({ message: "Recipe created successfully", recipe: newRecipe });
  } catch (error) {
    return res.status(500).json({ message: `Internal server error:${error}` });
  }
};

export const updateRecipeController = async (req: Request, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });
    const { recipeId } = req.params;
    const newRecipe = await updateRecipe(recipeId!, req.userId, req.body);
    if (!newRecipe)
      return res.status(404).json({ message: "Could not update recipe" });
    res
      .status(200)
      .json({ message: "Updated successfully", recipe: newRecipe });
  } catch (error) {
    return res.status(500).json({ message: `Internal server error:${error}` });
  }
};

export const deleteUserRecipeController = async (
  req: Request,
  res: Response
) => {
  const { recipeId } = req.params;
  if (!recipeId)
    return res.status(400).json({ message: "Please enter a valid recipe Id" });
  const id = req.userId;
  if (!id) return res.status(400).json({ message: "Please log in again" });
  try {
    const deleteRes = await deleteRecipe(id, recipeId);
    if (!deleteRes)
      return res.status(400).json({ message: "Something went wrong" });
    return res
      .status(200)
      .json({ message: "Successfully deleted recipe", recipe: deleteRes });
  } catch (error) {
    return res.status(401).json({ message: `Error:${error}` });
  }
};

export const getUserRecipesController = async (req: Request, res: Response) => {
  const id = req.userId;
  console.log(id);
  if (!id) return res.status(400).json({ message: "Please log in again" });

  try {
    const recipes = await getUserRecipes(id);
    console.log(recipes);
    if (!recipes)
      return res
        .status(400)
        .json({ message: "An error occured when receiving recipes" });
    return res.status(200).json(recipes);
  } catch (error) {
    return res.status(401).json({ message: `Error:${error}` });
  }
};
