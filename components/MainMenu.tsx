import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "@/navigation";
import useDimension from "@/hooks/useDimension";

const MainMenu: React.FC = () => {
  const pathname = usePathname();
  const t = useTranslations("Header");
  const [current, setCurrent] = useState(pathname);

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  const style = useDimension({
    defaultValue: { flex: "1 1 auto", width: "60%" },
    xs: { width: "50px" },
  });

  const menuItems = [
    {
      key: "/",
      label: <Link href="/">{t("home")}</Link>,
    },
    {
      key: "/collections",
      label: <Link href="/collections">{t("collecions")}</Link>,
    },
    {
      key: "/items",
      label: <Link href="/items">{t("items")}</Link>,
    },
  ];

  return (
    <Menu
      style={{ ...style, minWidth: 0, flex: "auto" }}
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={menuItems}
    />
  );
};

export default MainMenu;
