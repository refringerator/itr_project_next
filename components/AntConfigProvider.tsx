"use client";

import { ConfigProvider } from "antd";
import { theme } from "antd";
import { PropsWithChildren, useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

const AntConfigProvider = ({ children }: PropsWithChildren) => {
  const { theme: contextTheme } = useContext(ThemeContext);
  const { darkAlgorithm } = theme;
  const changedTheme = {
    algorithm: contextTheme === "dark" ? [darkAlgorithm] : [],
  };

  return <ConfigProvider theme={changedTheme}>{children}</ConfigProvider>;
};

export default AntConfigProvider;
