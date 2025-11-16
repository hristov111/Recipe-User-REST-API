import Router, {Request, Response} from "express";
import { getAllRecipes, createREcipe } from "../services/recipe.services";

const router = Router();


export const getRecipeController = async (req:Request,res:Response) => {
    try{
        const recipes =await getAllRecipes();
        return res.status(200).json({recipes:recipes});
    }catch(error){
        return res.status(500).json({message: "Internal server error"});
    }
}

export const createRecipeController = async(req:Request,res:Response) => {
    try{
        const {title, description, ingredients, instructions, cookingTime} = req.body;
        if(!title || !description || !ingredients || !instructions || !cookingTime)
            return res.status(401).json({message: "A field is missing"});

        const newRecipe = await createREcipe({
            title, description,ingredients,instructions,cookingTime
        })

        return res.status(201).json(newRecipe);
    }catch(error){
        return res.status(500).json({message: `Internal server error:${error}`});
    }
}  