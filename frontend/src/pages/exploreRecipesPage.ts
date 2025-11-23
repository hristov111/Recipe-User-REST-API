import exploreRecipesTemplate from "../templates/exploreRecipes.html?raw";
export const renderExploreRecipesTemplate = (root: HTMLElement) => {
  root.innerHTML = exploreRecipesTemplate;
};
