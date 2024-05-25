"use client";

import { Layout, Flex, Col, Row } from "antd";
import { Link } from "@/navigation";
import { Input, theme } from "antd";

import { SignOut } from "@/utils/auth-helpers/server";
import { getRedirectMethod } from "@/utils/auth-helpers/settings";
import { handleRequest } from "@/utils/auth-helpers/client";
import { usePathname, useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import LocaleSelector from "../LocaleSelector";
import ThemeSwitcher from "../ThemeSwitcher";

import React, { useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";

const MainMenu: React.FC = () => {
  const t = useTranslations("Header");
  const [current, setCurrent] = useState("mail");

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
    <Menu
      // style={{ flex: "auto", minWidth: 0 }}
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

interface HeaderProps {
  user?: any;
}

const headerStyle: React.CSSProperties = {
  textAlign: "end",
  height: 48,
  lineHeight: "48px",
  backgroundColor: "rgba(0, 0, 0, 0.1)",
  width: "100%",
  display: "flex",
  padding: 0,
};

const Header = ({ user }: HeaderProps) => {
  const router = useRouter();
  const path = usePathname();
  const t = useTranslations("Header");
  const { token } = theme.useToken();

  const onPressEnter = (value: string) => {
    if (value.length > 1) router.push(`/search?q=${value}`);
  };

  console.log({ token });

  return (
    <Layout.Header style={headerStyle}>
      <MainMenu />
      <Row
        align="middle"
        style={{
          width: "100%",
          backgroundColor: token.colorBgContainer,
          borderBottomWidth: token.lineWidth,
          borderBottomColor: token.colorSplit,
          borderBottomStyle: "solid",
        }}
      >
        <Col>
          <Flex align="center" style={{ width: "100%" }}>
            <Input.Search
              placeholder="input search"
              loading={false}
              onSearch={onPressEnter}
            />
          </Flex>
        </Col>
        <Col>
          <ThemeSwitcher />
        </Col>
        <Col>
          <LocaleSelector />
        </Col>
        <Col>
          {user ? (
            <button
              type="button"
              onClick={() => {
                handleRequest(
                  { pathName: path },
                  SignOut,
                  getRedirectMethod() === "client" ? router : null
                );
              }}
            >
              {t("signout")}
            </button>
          ) : (
            <Link href="/signin">{t("signin")}</Link>
          )}
        </Col>
      </Row>
    </Layout.Header>
  );
};

export { Header };
