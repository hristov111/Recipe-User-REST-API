export const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const backButtonRecipe = () => {
  const backButton = document.querySelector(
    ".back-button"
  ) as HTMLButtonElement;
  backButton?.addEventListener("click", (e) => {
    e.preventDefault();
    location.hash = "#home";
  });
};
