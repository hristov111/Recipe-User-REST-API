import Router from "express";
import { getRecipeController,createRecipeController } from "../controllers/recipe.controller";

const router = Router();


router.get('/', getRecipeController);
router.post('/', createRecipeController);


export default router;