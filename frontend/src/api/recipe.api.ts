import { getToken } from "../auth/authState";
import { getNewAccessToken } from "./auth";
import { getErrors, type ApiResponse } from "../auth/errorHandling";
const API_BASE_RECIPE = "http://localhost:3000/api/recipes";

interface IRecipe {
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  cookingTime: string;
}

export const createRecipe = async (
  data: IRecipe
): Promise<ApiResponse<any>> => {
  try {
    console.log("Create recipe Api");
    const token = getToken();
    console.log(token);
    if (!token) {
      const res = await getNewAccessToken();
      if (res.error) return res;
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
    }
    return { error: false, data: dataJson.message };
  } catch (error: any) {
    return { error: true, errors: [{ msg: error, path: "general" }] };
  }
};
