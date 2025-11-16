import { RecipeModel, IRecipe } from "../models/recipe.model";


interface CreateRecipeInput {
    title: string,
    description: string,
    ingredients: string[],
    instructions: string,
    cookingTime: number,
}

// Get all recipes 
export const getAllRecipes = async(): Promise<IRecipe[]> => {
    return RecipeModel.find().exec()
}


export const createREcipe = async(data: CreateRecipeInput): Promise<IRecipe> =>{
    const recipe = new RecipeModel(data);
    return recipe.save();
}

