"use client";

import { createContext, PropsWithChildren, useState } from "react";

/** Types */
export type Theme = "light" | "dark";

interface ThemeContextProps {
  theme: Theme;
  setTheme: (value: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: "light",
  setTheme: () => {
    // TODO: ? Unexpected empty method
  },
});

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const ctheme = "dark";
  const [theme, setTheme] = useState<Theme>(ctheme as Theme);

  const value = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
