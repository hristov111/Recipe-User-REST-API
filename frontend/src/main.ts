import "./styles/login.scss";
import "./styles/home.css";
import "./styles/createRecipe.css";
import "./styles/errorSuccess.css";
import "./styles/navbar.css";
import "./styles/settings.css";
import "./styles/explore-recipes.css";

import { isLoggedIn } from "./auth/authState";
import { renderLoginPage, renderRegisterPage } from "./auth/authPages";
import { renderHomePage } from "./pages/homePage";
import { clearNavbar, renderNavbar } from "./pages/navPage";
import { renderCreateRecipe } from "./pages/createRecipe";
import { renderEditRecipeTemplate } from "./pages/editRecipe";
import { renderSettingsPage } from "./pages/settingsPage";
import { renderExploreRecipesTemplate } from "./pages/exploreRecipesPage";
const root = document.getElementById("app") as HTMLDivElement;
const navbarRoot = document.querySelector(".navbar-wrapper") as HTMLDivElement;
function render() {
  const hash = location.hash || (isLoggedIn() ? "#home" : "#login");

  if (hash === "#login") {
    clearNavbar(navbarRoot);
    renderLoginPage(root);
  } else if (hash === "#register") {
    clearNavbar(navbarRoot);
    renderRegisterPage(root);
  } else if (hash === "#home") {
    renderHomePage(root);
    renderNavbar(navbarRoot);
  } else if (hash === "#createRecipe") {
    renderNavbar(navbarRoot);
    renderCreateRecipe(root);
  } else if (hash === "#edit") {
    renderNavbar(navbarRoot);
    renderEditRecipeTemplate(root);
  } else if (hash === "#settings") {
    renderNavbar(navbarRoot);
    renderSettingsPage(root);
  } else if (hash === "#exploreRecipes") {
    renderNavbar(navbarRoot);
    renderExploreRecipesTemplate(root);
  } else {
    location.hash = "#login";
  }
}

window.addEventListener("hashchange", render);
render();
