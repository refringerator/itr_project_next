import { Switch } from "antd";
import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";

export default function ThemeSwitcher() {
  const { setTheme, theme } = useContext(ThemeContext);
  const onChange = (checked: boolean) => {
    const theme = checked ? "light" : "dark";
    setTheme(theme);
  };

  return <Switch defaultValue={theme === "light"} onChange={onChange} />;
}
