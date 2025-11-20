import { updateRecipe } from "../api/recipe.api";
import { handleErrorAndSuccess } from "../auth/errorHandling";
import editRecipeTemplate from "../templates/createRecipe.html?raw";
import { backButtonRecipe } from "../utils/useful.utils";
import type { Recipe } from "./homePage";

export interface CurrentRecipe {
  _id: string;
  title: string;
  description: string;
  instructions: string;
  ingredients: string;
  cookingTime: string;
}

export const renderEditRecipeTemplate = async (root: HTMLElement) => {
  root.innerHTML = editRecipeTemplate;
  backButtonRecipe();
  const state = history.state as { recipe?: CurrentRecipe };
  if (!state?.recipe) {
    location.hash = "#home";
    return;
  }
  const { _id, title, description, instructions, ingredients, cookingTime } =
    state.recipe;
  const form = document.querySelector(".recipe-form") as HTMLFormElement;
  // populate the
  const titleHTML = document.querySelector(
    'input[name="title"]'
  ) as HTMLInputElement;
  const descriptionHTML = document.querySelector(
    'textarea[name="description"]'
  ) as HTMLTextAreaElement;
  const ingredientsHTML = document.querySelector(
    'textarea[name="ingredients"]'
  ) as HTMLTextAreaElement;
  const instructionsHTML = document.querySelector(
    'textarea[name="instructions"]'
  ) as HTMLTextAreaElement;
  const cookingTimeHTML = document.querySelector(
    'input[name="cookingTime"]'
  ) as HTMLInputElement;
  titleHTML.value = title;
  descriptionHTML.value = description;
  ingredientsHTML.value = ingredients;
  instructionsHTML.value = instructions;
  cookingTimeHTML.value = cookingTime;

  const titleRecipe = root.querySelector("#title-recipe") as HTMLHeadingElement;
  titleRecipe.textContent = "Edit Recipe";
  const createRecipeButton = root.querySelector(
    ".createRecipe-btn"
  ) as HTMLElement;
  createRecipeButton.hidden = true;
  const editRecipeButton = root.querySelector(".editRecipe-btn") as HTMLElement;
  editRecipeButton.hidden = false;

  editRecipeButton.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("clicking");
    const formData = new FormData(form);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const instructions = formData.get("instructions") as string;
    const ingredients = formData.get("ingredients") as string;
    const cookingTime = formData.get("cookingTime") as string;
    const res = await updateRecipe({
      _id,
      title,
      description,
      ingredients,
      instructions,
      cookingTime,
    });
    handleErrorAndSuccess(res, root);
    if (!res.error) {
    }
  });
};
