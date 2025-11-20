import { getUserRecipes } from "../api/recipe.api";
import { getUserById } from "../api/user.api";
import { handleErrorAndSuccess, type ApiSuccess } from "../auth/errorHandling";
import homeTemplate from "../templates/home.html?raw";

export interface Recipe {
  title: string;
  description: string;
  instructions: string;
  ingredients: string;
  cookingTime: string;
}

export const renderHomePage = async (root: HTMLElement) => {
  root.innerHTML = homeTemplate;

  const homeTitle = root.querySelector(".home-title") as HTMLHeadElement;
  const user = await getUserById();
  if (user.error) {
    handleErrorAndSuccess(user, root);
  } else {
    homeTitle.textContent = `Welcome back, ${user.data.username}!`;
  }

  const addRecipeButton = document.querySelector(
    ".add-recipe"
  ) as HTMLButtonElement;

  const recipesWrapper = root.querySelector(".recipe-grid");

  //   get all the user recipes and display them
  const data = (await getUserRecipes(root)) as {
    error: boolean;
    data: any[];
  };
  localStorage.setItem("recipes", JSON.stringify(data.data));
  console.log(data);

  const frag = document.createDocumentFragment();
  data.data.forEach((recipe) => {
    const card = createRecipeCard(recipe);
    frag.appendChild(card);

    const editButton = card.querySelector(".edit-btn") as HTMLButtonElement;
    const deleteButton = card.querySelector(".delete-btn") as HTMLButtonElement;

    editButton.addEventListener("click", (e) => {
      e.preventDefault();
      editRecipe(recipe);
    });
  });

  recipesWrapper?.appendChild(frag);
  addRecipeButton.addEventListener("click", (e) => {
    e.preventDefault();
    location.hash = "#createRecipe";
  });
};

const createRecipeCard = ({
  title,
  description,
  instructions,
  ingredients,
  cookingTime,
}: Recipe) => {
  const card = document.createElement("article");
  card.className = "recipe-card";
  card.innerHTML = `
        <h1>${title}</h1>
        <p class="recipe-description">${description}</p>
        <p class="recipe-ingredients">${ingredients}</p>
        <p class="recipe-instructions">${instructions}</p>
        <h2>${cookingTime} mins</h2>
        <div class="recipe-actions">
            <button class="recipe-btn ghost-btn edit-btn">Edit</button>
            <button class="recipe-btn danger-btn delete-btn">Delete</button> 
        </div>
          
    `;
  return card;
};

const deleteRecipe = () => {};

const editRecipe = (recipe: Recipe) => {
  console.log(recipe);
  history.pushState({ recipe }, "", "#edit");
  window.dispatchEvent(new HashChangeEvent("hashchange"));
};
