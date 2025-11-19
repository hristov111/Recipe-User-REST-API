import { Types } from "mongoose";
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

export const updateRecipe = async (
  recipeId: string,
  ownerId: string,
  updates: Partial<IRecipe>
): Promise<IRecipe | null> => {
  const query = { _id: recipeId, owner: new Types.ObjectId(ownerId) };

  const updatesRecipes = await RecipeModel.findOneAndUpdate(
    query,
    { $set: updates },
    { new: true, runValidators: true }
  ).exec();

  return updatesRecipes;
};

export const getUserRecipes = (ownerId: string) => {
  return RecipeModel.find({ owner: new Types.ObjectId(ownerId) }).exec();
};
