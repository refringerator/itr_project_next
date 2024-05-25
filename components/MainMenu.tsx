import React, { useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
import Link from "next/link";
import { useTranslations } from "next-intl";

const MainMenu: React.FC = () => {
  const t = useTranslations("Header");
  const [current, setCurrent] = useState("mail");
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const items = [
    {
      key: "1",
      label: <Link href="/">{t("home")}</Link>,
    },
    {
      key: "2",
      label: <Link href="/collections">{t("collecions")}</Link>,
    },
    {
      key: "3",
      label: <Link href="/items">{t("items")}</Link>,
    },
  ];

  return (
    <>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16 }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        // style={{ flex: "auto", minWidth: 0 }}
        inlineCollapsed={collapsed}
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </>
  );
};

export default MainMenu;
