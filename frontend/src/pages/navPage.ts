import { clearToken } from "../auth/authState";
import { clearLogOutToken } from "../api/auth";
import navbarTemplate from "../templates/navbar.html?raw";

export const renderNavbar = (root: HTMLElement) => {
  root.innerHTML = navbarTemplate;
  setLogOutButton();
};

export const clearNavbar = (root: HTMLElement) => {
  root.innerHTML = "";
};

export const setLogOutButton = () => {
  const logOutButton = document.querySelector(
    ".cta-button"
  ) as HTMLAnchorElement;

  logOutButton.addEventListener("click", async (e) => {
    e.preventDefault();

    clearToken();
    const message = await clearLogOutToken();
    if (message.error) {
      // Couldnt log out
    } else {
      // Logged out successfully
    }
    location.hash = "#login";
  });
};
