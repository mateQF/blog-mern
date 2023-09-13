import { createContext, useEffect, useState } from "react";
import {
  profile,
  login as loginService,
  logout as logoutService,
  register as registerService,
} from "../services/user";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState({
    id: "",
    username: "",
    posts: [],
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const updateUserInfoFromCookies = async () => {
    const response = await profile();
    if (response.status === 200) {
      const { username, id, posts } = response.data;
      setUser({
        id,
        username,
        posts,
      });
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    updateUserInfoFromCookies();
  }, []);

  const loginUser = async (username, password) => {
    try {
      const response = await loginService(username, password);

      if (response.status === 200) {
        updateUserInfoFromCookies();
        navigate("/");
      }

      return response;
    } catch (error) {
      console.error("Error while login: ", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const response = await logoutService();

      if (response.status === 200) {
        setUser({
          id: "",
          username: "",
          posts: [],
        });
        setIsAuthenticated(false);
        navigate("/login");
      }
      return response;
    } catch (error) {
      console.error("Error while logout: ", error);
      throw error;
    }
  };

  const registerUser = async (username, password) => {
    try {
      const { status, data } = await registerService(username, password);

      if (status === 200) {
        setUser({
          id: data.id,
          username: data.username,
          posts: [],
        });
        setIsAuthenticated(true);
        navigate("/");
      }

      return { status, data };
    } catch (error) {
      console.error("Error while register: ", error);
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, loginUser, logout, registerUser, isAuthenticated }}
    >
      {children}
    </UserContext.Provider>
  );
}
