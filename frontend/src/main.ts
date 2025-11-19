import "./styles/login.scss";
import "./styles/home.css";
import "./styles/createRecipe.css";
import "./styles/errorSuccess.css";

import { isLoggedIn } from "./auth/authState";
import { renderLoginPage, renderRegisterPage } from "./auth/authPages";
import { renderHomePage } from "./pages/homePage";
import { clearNavbar, renderNavbar } from "./pages/navPage";
import { renderCreateRecipe } from "./pages/createRecipe";
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
    renderCreateRecipe(root);
  } else {
    location.hash = "#login";
  }
}

window.addEventListener("hashchange", render);
render();
