import { createContext, useState } from "react";

const ThemeContext = createContext();
export { ThemeContext };
export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState({ name: "theme-green", color: "#299D91" });

  const themes = {
    light: { name: "theme-light", color: "#FFFFFF" },
    dark: { name: "theme-dark", color: "#121212" },
    green: { name: "theme-green", color: "#299D91" },
  };

  const toggleTheme = (newTheme) => {
    setTheme(themes[newTheme] || themes.green);
  };

  return <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>{children}</ThemeContext.Provider>;
};