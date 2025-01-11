import { createContext, useState, useEffect } from "react";

const INITIAL_STATE = localStorage.getItem("refreshToken") ? true : false;

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(INITIAL_STATE);
  const [name, setName] = useState(() => localStorage.getItem("username") || "");

  useEffect(() => {
    if (name) {
      localStorage.setItem("username", name);
    } else {
      localStorage.removeItem("username");
    }
  }, [name]);

  return <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, name, setName }}>{children}</AuthContext.Provider>;
};