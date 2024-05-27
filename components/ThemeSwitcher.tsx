import { Select } from "antd";
import { ControlOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";

import { useCallback, useEffect, useMemo, useState } from "react";

import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import useDimension from "@/hooks/useDimension";

type Theme = {
  value: "system" | "dark" | "light";
  label: string;
  icon: React.ReactNode;
};

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const t = useTranslations("ThemeSwitcher");
  const showTitle = useDimension({ xs: false, sm: false, md: true });

  useEffect(() => {
    setMounted(true);
  }, []);

  const themes: Theme[] = useMemo(
    () => [
      { value: "system", label: t("system"), icon: <ControlOutlined /> },
      { value: "dark", label: t("dark"), icon: <MoonOutlined /> },
      { value: "light", label: t("light"), icon: <SunOutlined /> },
    ],
    [t]
  );
  const findIconByValue = useCallback(
    (value: string) => themes.find((e) => e.value === value)?.icon,
    [themes]
  );

  const optionRender = useCallback(
    (props: any) => (
      <>
        {findIconByValue(props.value)} {props.label}
      </>
    ),
    [findIconByValue]
  );

  const labelRender = useCallback(
    (props: any) => (
      <>
        {findIconByValue(props.value)} {showTitle && t("theme")}
      </>
    ),
    [findIconByValue, showTitle, t]
  );

  if (!mounted) {
    return null;
  }

  return (
    <Select
      value={theme}
      options={themes}
      onChange={(e) => setTheme(e)}
      labelRender={labelRender}
      optionRender={optionRender}
      dropdownStyle={{ minWidth: "150px" }}
    />
  );
}
