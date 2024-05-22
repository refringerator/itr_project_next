import { Select } from "antd";
import { ControlOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";

import { useEffect, useState } from "react";

import { useTheme } from "next-themes";

type Theme = {
  value: "system" | "dark" | "light";
  label: string;
  icon: React.ReactNode;
};

const themes: Theme[] = [
  { value: "system", label: "OS Default", icon: <ControlOutlined /> },
  { value: "dark", label: "Dark", icon: <MoonOutlined /> },
  { value: "light", label: "Light", icon: <SunOutlined /> },
];

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const findIconByValue = (value: string) =>
    themes.find((e) => e.value === value)?.icon;

  const labelRender = (props: any) => <>{findIconByValue(props.value)} Theme</>;
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
