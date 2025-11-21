import { getUserById, userPATCH } from "../api/user.api";
import { handleErrorAndSuccess } from "../auth/errorHandling";
import settingsTemplate from "../templates/settings.html?raw";

export interface User {
  username: string;
  email: string;
}

export const renderSettingsPage = async (root: HTMLElement) => {
  root.innerHTML = settingsTemplate;
  // get user here
  const usernameInput = root.querySelector(
    "input[name='username']"
  ) as HTMLInputElement;
  const emailInput = root.querySelector(
    "input[name='email']"
  ) as HTMLInputElement;
  const passwordInput = root.querySelector(
    "input[name='password']"
  ) as HTMLInputElement;
  const passwordToggle = root.querySelector(
    ".password-toggle"
  ) as HTMLButtonElement | null;
  const form = root.querySelector(".settings-form") as HTMLFormElement;
  const updateRecordsButton = root.querySelector(
    ".settings-btn"
  ) as HTMLButtonElement;

  if (passwordToggle) {
    passwordToggle.addEventListener("click", () => {
      const showing = passwordInput.type === "password";
      passwordInput.type = showing ? "text" : "password";
      passwordToggle.textContent = showing ? "Hide" : "Show";
      passwordToggle.setAttribute("aria-pressed", String(showing));
    });
  }
  const res = await getUserById();
  if (res.error) {
    handleErrorAndSuccess(res, root);
  } else {
    usernameInput.value = res.data.username;
    emailInput.value = res.data.email;
  }

  form.addEventListener("submit", async (e) => {
    console.log("click");
    e.preventDefault();
    const formData = new FormData(form);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log(password);
    if (!res.error) {
      const changedFields = getChangedFields(
        username,
        email,
        password,
        res.data
      );
      console.log(changedFields);
      if (Object.keys(changedFields).length) {
        // make patch request
        const res = await userPATCH(changedFields);
        handleErrorAndSuccess(res, root);
        // location.reload();
      } else {
        return;
      }
    }
  });
};

const getChangedFields = (
  username: string,
  email: string,
  password: string,
  data: any
): Record<string, string> => {
  let obj: Record<string, string> = {};
  if (data.username !== username) obj["username"] = username;
  if (data.email !== email) obj["email"] = email;
  if (password) obj["password"] = password;
  return obj;
};
