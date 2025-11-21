import { getToken } from "../auth/authState";
import { getNewAccessToken } from "./auth";

import {
  getErrors,
  handleErrorAndSuccess,
  type ApiResponse,
} from "../auth/errorHandling";
import { wait } from "../utils/useful.utils";
import type { CurrentRecipe } from "../pages/editRecipe";
const API_BASE_RECIPE = "http://localhost:3000/api/recipes";

interface IRecipe {
  title: string;
  description: string;
  instructions: string;
  ingredients: string;
  cookingTime: string;
}

export const deleteRecipeAPI = async (
  _id: string
): Promise<ApiResponse<any>> => {
  let token = getToken();
  if (!token) {
    const res = await getNewAccessToken();
    if (res.error) return res;
    token = res.data ?? getToken();
  }

  try {
    const res = await fetch(`${API_BASE_RECIPE}/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
    const json = await res.json();
    if (!res.ok) {
      // check token beforre returning
      return { error: true, errors: [{ msg: json.message, path: "general" }] };
    }
    return { error: false, data: json.message };
  } catch (error: any) {
    return { error: true, errors: [{ msg: error, path: "general" }] };
  }
};

export const updateRecipe = async (
  data: CurrentRecipe
): Promise<ApiResponse<any>> => {
  let token = getToken();
  if (!token) {
    const res = await getNewAccessToken();
    if (res.error) return res;
    token = res.data ?? getToken();
  }
  const res = await fetch(`${API_BASE_RECIPE}/${data._id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) {
    // token has expired or there is a problem
    if (json.errors) {
      return getErrors(json);
    }
    return { error: true, errors: [{ msg: json.message, path: "general" }] };
  }
  return { error: false, data: json.message };
};

export const createRecipe = async (
  data: IRecipe
): Promise<ApiResponse<any>> => {
  try {
    console.log("Create recipe Api");
    let token = getToken();
    console.log(token);
    if (!token) {
      const res = await getNewAccessToken();
      if (res.error) return res;
      token = res.data ?? getToken();
    }
    console.log("Passes Token");

    const res = await fetch(`${API_BASE_RECIPE}/createRecipe`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const dataJson = await res.json();
    console.log(dataJson);
    if (!res.ok) {
      if (dataJson.message && dataJson.message.includes("jwt expired")) {
        const res = await getNewAccessToken();
        if (res.error) return res;
        return await createRecipe(data);
      }
      if (dataJson.errors) {
        // return {error: true, errors [msg: , path]}
        return getErrors(dataJson);
      }
      return {
        error: true,
        errors: [{ msg: dataJson.message, path: "general" }],
      };
    }
    return { error: false, data: dataJson.message };
  } catch (error: any) {
    return { error: true, errors: [{ msg: error, path: "general" }] };
  }
};

export const getUserRecipes = async (
  root: HTMLElement
): Promise<ApiResponse<any>> => {
  let token = getToken();
  if (!token) {
    const res = await getNewAccessToken();
    if (res.error) return res;
    token = res.data ?? getToken();
  }

  const res = await fetch(`${API_BASE_RECIPE}/getUserRecipes`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
  const dataJson = await res.json();
  console.log(dataJson);
  if (!res.ok) {
    // three possibilities - status 400 - Please log in again
    // token expired
    if (dataJson.message && dataJson.message.includes("jwt expired")) {
      const res = await getNewAccessToken();
      if (res.error) return res;
      wait(2000);
      return await getUserRecipes(root);
    }
    handleErrorAndSuccess(
      { error: true, errors: [{ msg: dataJson.message, path: "general" }] },
      root
    );
    return {
      error: true,
      errors: [{ msg: dataJson.message, path: "general" }],
    };
  }
  return { error: false, data: dataJson };
};
