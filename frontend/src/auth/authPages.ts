import { login, register } from "../api/auth";
import template from "../templates/login_register.html?raw";
import { saveToken } from "./authState";
import { wait } from "../utils/useful.utils";
import { handleErrorAndSuccess } from "./errorHandling";

export const renderLoginRegisterPages = async (
  root: HTMLElement,
  page: string
) => {
  root.innerHTML = template;
  const authTitle = document.querySelector(".auth-title") as HTMLHeadingElement;
  const form = document.querySelector(
    ".login-register-form"
  ) as HTMLFormElement;
  const buttonText = document.querySelector(
    ".button-text"
  ) as HTMLButtonElement;
  const usernameControl = document.querySelector("[data-username-control]");
  const registerControl = document.querySelector("[data-register-link]");
  const loginControl = document.querySelector("[data-login-link]");
  const errorControl = document.getElementById(
    "login-register-error"
  ) as HTMLParagraphElement;
  console.log(authTitle, buttonText);
  if (page === "login") {
    authTitle.textContent = "Login";
    buttonText.textContent = "Log in";

    usernameControl?.remove();
    loginControl?.remove();
  } else {
    authTitle.textContent = "Register";
    buttonText.textContent = "Register";
    registerControl?.remove();
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      if (page === "login") {
        const data = await login({ email, password });
        if (!data.error) {
          saveToken(data.data.accessToken);
          await wait(2000);
          location.hash = "#home";
        } else {
          handleErrorAndSuccess(data, root);
        }
      } else {
        const errors = await register({ username, email, password });
        const error = handleErrorAndSuccess(errors, root, ["username"]);
        if (!error) {
          await wait(2000);
          location.hash = "#login";
        }
      }
    } catch (error) {
      console.log(error);
      handleErrorAndSuccess(
        {
          error: true,
          errors: [
            {
              msg: `Internal Server Error. Please try again later`,
              path: "general",
            },
          ],
        },
        root
      );
    }
  });
};

export const renderRegisterPage = (root: HTMLElement) => {
  renderLoginRegisterPages(root, "register");
};

export const renderLoginPage = (root: HTMLElement) => {
  renderLoginRegisterPages(root, "login");
};
