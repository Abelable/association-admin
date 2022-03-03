import { AuthForm } from "types/authForm";
import { http } from "./http";

const localStorageKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const login = async (form: AuthForm) => {
  const { token } = await http("/api/admin/site/admin-login", {
    method: "POST",
    data: form,
  });
  window.localStorage.setItem(localStorageKey, token);
  return token;
};

export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
