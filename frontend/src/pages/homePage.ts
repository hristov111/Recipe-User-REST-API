import homeTemplate from "../templates/home.html?raw";
export const renderHomePage = (root: HTMLElement) => {
  root.innerHTML = homeTemplate;

  const addRecipeButton = document.querySelector(
    ".add-recipe"
  ) as HTMLButtonElement;

  addRecipeButton.addEventListener("click", (e) => {
    e.preventDefault();
    location.hash = "#createRecipe";
  });
};
