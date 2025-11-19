import { getToken, saveToken } from "../auth/authState";
import { type ApiError, type ApiResponse } from "../auth/errorHandling";
import { getErrors } from "../auth/errorHandling";
const API_BASE = "http://localhost:3000/api/users";

export interface IRegister {
  username: string;
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export const register = async (data: IRegister): Promise<ApiResponse<any>> => {
  const res = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) {
    // erros.path = which field
    // errors.msg = error message

    if (json.errors) {
      return getErrors(json);
    } else if (json.message) {
      return { error: true, errors: [{ msg: json.message, path: "general" }] };
    }
    // throw new Error(errors.msg || "Failed to register");
  }
  return { error: false, data: json };
};

export const login = async (data: ILogin): Promise<ApiResponse<any>> => {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) {
    return { error: true, errors: [{ msg: json.message, path: "general" }] };
  }
  return {
    error: false,
    data: { accessToken: json.access_token, message: json.message },
  };
};

export const clearLogOutToken = async () => {
  try {
    const res = await fetch(`${API_BASE}/logout`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
    });
    const json = await res.json();
    return json;
  } catch (error) {
    return { error: true, message: error };
  }
};

export const getNewAccessToken = async (): Promise<ApiResponse<string>> => {
  try {
    console.log("Getting new token");
    const res = await fetch(`${API_BASE}/refreshAccessToken`, {
      method: "GET",
      credentials: "include",
    });
    const json = await res.json();
    console.log(json);
    if (!res.ok) {
      return { error: true, errors: [{ msg: json.message, path: "general" }] };
    }
    console.log("saving token");
    saveToken(json.accessToken);
    return { error: false, data: json.accessToken };
  } catch (error: any) {
    return { error: true, errors: [{ msg: error, path: "general" }] };
  }
};
