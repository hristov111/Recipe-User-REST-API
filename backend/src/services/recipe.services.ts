import { Types, DeleteResult } from "mongoose";
import { RecipeModel, IRecipe } from "../models/recipe.model";

interface CreateRecipeInput {
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  cookingTime: number;
}

// Get all recipes
export const getAllRecipes = async (): Promise<IRecipe[]> => {
  return RecipeModel.find().exec();
};

export const createRecipe = async (
  userId: string,
  data: CreateRecipeInput
): Promise<IRecipe> => {
  const recipe = await RecipeModel.create({
    ...data,
    owner: userId,
  });
  return recipe.save();
};

export const deleteRecipe = async (
  userId: string,
  recipeId: string
): Promise<DeleteResult> => {
  return RecipeModel.deleteOne({
    _id: new Types.ObjectId(recipeId),
    owner: new Types.ObjectId(userId),
  }).exec();
};

export const updateRecipe = async (
  recipeId: string,
  ownerId: string,
  updates: Partial<IRecipe>
): Promise<IRecipe | null> => {
  const query = { _id: recipeId, owner: new Types.ObjectId(ownerId) };

  const updatesRecipes = await RecipeModel.findOneAndUpdate(query, updates, {
    new: true,
    runValidators: true,
    overwrite: true,
  }).exec();

  return updatesRecipes;
};

export const getUserRecipes = (ownerId: string) => {
  return RecipeModel.find({ owner: new Types.ObjectId(ownerId) }).exec();
};
