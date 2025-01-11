import { createContext, useState, useContext } from "react";

export const ModeContext = createContext();

export const ModeContextProvider = ({ children }) => {
  const [mode, setMode] = useState(false);

  const toggleMode = () => setMode((prev) => !prev);

  return <ModeContext.Provider value={{ mode, toggleMode }}>{children}</ModeContext.Provider>;
};

export const useMode = () => useContext(ModeContext);