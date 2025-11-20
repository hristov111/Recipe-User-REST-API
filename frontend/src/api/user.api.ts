import { getToken } from "../auth/authState";
import type { ApiResponse } from "../auth/errorHandling";
import { getNewAccessToken } from "./auth";

const API_USER_URL = "http://localhost:3000/api/users";

export const getUserById = async (): Promise<ApiResponse<any>> => {
  let token = getToken();
  if (!token) {
    const res = await getNewAccessToken();
    if (res.error) return res;
    token = res.data ?? getToken();
  }
  try {
    const res = await fetch(`${API_USER_URL}/getUserById`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    const json = await res.json();
    if (!res.ok) {
      return { error: true, errors: [{ msg: json.message, path: "general" }] };
    }
    return { error: false, data: json };
  } catch (error: any) {
    return { error: true, errors: [{ msg: error, path: "general" }] };
  }
};
