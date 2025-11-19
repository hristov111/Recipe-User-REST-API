export interface ApiError {
  error: true;
  errors: { msg: string; path: string }[];
}

export interface ApiSuccess<T> {
  error: false;
  data: T;
}

export const getErrors = (data: any): ApiError => {
  const errors = data.errors.map((err: any) => ({
    msg: err.msg,
    path: err.path,
  }));
  return { error: true, errors: errors };
};

export type ApiResponse<T> = ApiError | ApiSuccess<T>;

export const clearFieldErrors = (root: HTMLElement) => {
  root.querySelectorAll(".field-error").forEach((el) => {
    console.log("clearing errors for", el);
    el.innerHTML = "";
    el.setAttribute("style", "dsiplay:none");
  });

  root.querySelectorAll("input").forEach((el) => {
    el.classList.remove("input-error");
  });
  root.querySelectorAll("textarea").forEach((el) => {
    el.classList.remove("input-error");
  });
};

const showFieldError = (
  root: HTMLElement,
  data: { msg: string; path: string }[],
  namesForBigMessages: string[]
) => {
  data.forEach((el) => {
    const field = root.querySelector<HTMLInputElement | HTMLTextAreaElement>(
      `input[name="${el.path}"], textarea[name="${el.path}"]`
    );
    const errorBox = root.querySelector(
      `[data-error-for="${el.path}"]`
    ) as HTMLElement | null;

    field?.classList.add("input-error");

    if (errorBox) {
      if (namesForBigMessages.includes(el.path)) {
        createListErrors(el.msg, errorBox);
      } else {
        errorBox.textContent = el.msg;
      }
      errorBox.style.display = "block";
    }
  });
};

export const clearSuccessMessage = (root: HTMLElement) => {
  const fieldSuccess = root.querySelector(
    "[data-error-for='general']"
  ) as HTMLParagraphElement;
  fieldSuccess?.classList.remove("field-success");
  fieldSuccess?.classList.add("field-error");
  fieldSuccess.style.display = "none";
};

export const showSuccessMessage = (root: HTMLElement, message: string) => {
  const fieldSuccess = root.querySelector(
    "[data-error-for='general']"
  ) as HTMLParagraphElement;
  fieldSuccess.textContent = message;
  fieldSuccess?.classList.remove("field-error");
  fieldSuccess?.classList.add("field-success");
  fieldSuccess.style.display = "block";
};

const createListErrors = (msg: string, errorBox: HTMLElement) => {
  const msgArray = msg.split("\n");
  msgArray.forEach((msg: string) => {
    const item = document.createElement("li");
    item.textContent = msg;
    errorBox.appendChild(item);
  });
};

// we have two types of error and success message -> general and specific
//
export const handleErrorAndSuccess = (
  data: ApiResponse<any>,
  root: HTMLElement,
  namesForBigMessages: string[] = []
) => {
  console.log("Handling Errors");
  // WE HAVE ERORS
  if (data.error) {
    // the actual error field can be input or textArea
    clearFieldErrors(root);
    showFieldError(root, data.errors, namesForBigMessages);
    return true;
  } else {
    // WE DONT HAVE ERRORS - THERE WILL BE ONE SUCCESS MESSAGE
    clearSuccessMessage(root);
    showSuccessMessage(root, data.data);
    return false;
  }
};
