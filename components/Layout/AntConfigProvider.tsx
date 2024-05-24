"use client";

import { ConfigProvider } from "antd";
import { theme } from "antd";
import { PropsWithChildren, useEffect, useState } from "react";
import { useTheme } from "next-themes";

const AntConfigProvider = ({ children }: PropsWithChildren) => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);

  const { darkAlgorithm } = theme;
  const changedTheme = {
    algorithm: resolvedTheme === "dark" ? [darkAlgorithm] : [],
  };

  if (!mounted) {
    return null;
  }

  return <ConfigProvider theme={changedTheme}>{children}</ConfigProvider>;
};

export default AntConfigProvider;
