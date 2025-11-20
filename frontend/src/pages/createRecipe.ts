import { createRecipe } from "../api/recipe.api";
import createRecipeTemplate from "../templates/createRecipe.html?raw";
import {
  clearFieldErrors,
  clearSuccessMessage,
  handleErrorAndSuccess,
} from "../auth/errorHandling";
import { backButtonRecipe } from "../utils/useful.utils";

export const renderCreateRecipe = (root: HTMLElement) => {
  root.innerHTML = createRecipeTemplate;
  backButtonRecipe();

  const titleRecipe = root.querySelector("#title-recipe") as HTMLHeadingElement;
  titleRecipe.textContent = "Create Recipe";
  const form = document.querySelector(".recipe-form") as HTMLFormElement;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearFieldErrors(root);
    const formData = new FormData(form);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const ingredients = formData.get("ingredients") as string;
    const instructions = formData.get("instructions") as string;
    const cookingTime = formData.get("cookingTime") as string;

    try {
      const res = await createRecipe({
        title,
        description,
        ingredients,
        instructions,
        cookingTime,
      });
      handleErrorAndSuccess(res, root);
    } catch (error: any) {
      handleErrorAndSuccess(
        { error: true, errors: [{ msg: error, path: "general" }] },
        root
      );
    }
  });
};
