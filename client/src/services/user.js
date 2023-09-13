import { customAxios } from "./axios.js";

export const login = async (username, password) => {
  const response = await customAxios.post(
    "/login",
    {
      username,
      password,
    },
    {
      withCredentials: true,
    }
  );

  return response;
};

export const register = async (username, password) => {
  const response = await customAxios.post(
    "/register",
    {
      password,
      username,
    },
    {
      withCredentials: true,
    }
  );
  return response;
};

export const profile = async () => {
  const response = await customAxios.get("/profile", {
    withCredentials: true,
  });
  return response;
};

export const logout = async () => {
  const response = await customAxios.post(
    "/logout",
    {},
    {
      withCredentials: true,
    }
  );
  return response;
};
