"use client";

import { ConfigProvider } from "antd";
import { theme } from "antd";
import { PropsWithChildren, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import ru from "antd/locale/ru_RU";
import { useParams } from "next/navigation";

const AntConfigProvider = ({ children }: PropsWithChildren) => {
  const { locale } = useParams();
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

  return (
    <ConfigProvider
      theme={changedTheme}
      locale={locale === "ru" ? ru : undefined}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntConfigProvider;
