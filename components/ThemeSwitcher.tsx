import { Select, Grid } from "antd";
import { ControlOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";

import { useEffect, useState } from "react";

import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

type Theme = {
  value: "system" | "dark" | "light";
  label: string;
  icon: React.ReactNode;
};

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const t = useTranslations("ThemeSwitcher");
  const screens = Grid.useBreakpoint();

  // console.log({ ...screens });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const themes: Theme[] = [
    { value: "system", label: t("system"), icon: <ControlOutlined /> },
    { value: "dark", label: t("dark"), icon: <MoonOutlined /> },
    { value: "light", label: t("light"), icon: <SunOutlined /> },
  ];

  const findIconByValue = (value: string) =>
    themes.find((e) => e.value === value)?.icon;

  const labelRender = (props: any) => (
    <>
      {findIconByValue(props.value)} {t("theme")}
    </>
  );
  const optionRender = (props: any) => (
    <>
      {findIconByValue(props.value)} {props.label}
    </>
  );

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
