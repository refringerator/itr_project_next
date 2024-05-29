"use client";

import { Layout, Flex, Col, Row, Button, Tooltip, Popover } from "antd";
import { Input, theme, Avatar } from "antd";
import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";

import { useTranslations } from "next-intl";
import LocaleSelector from "../../components/LocaleSelector";

import { usePathname, useRouter } from "@/navigation";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import MainMenu from "../../components/MainMenu";
import useDimension from "@/hooks/useDimension";

import { handleRequest } from "@/utils/auth-helpers/client";
import { getRedirectMethod } from "@/utils/auth-helpers/settings";
import { SignOut } from "@/utils/auth-helpers/server";
import { useContext } from "react";
import { Context } from "@/context/context-provider";

const headerStyle: React.CSSProperties = {
  textAlign: "end",
  height: 52,
  lineHeight: "52px",
  backgroundColor: "rgba(0, 0, 0, 0.1)",
  width: "100%",
  display: "flex",
  padding: 0,
  position: "sticky",
  top: "0",
  zIndex: 10,
};

const Header = () => {
  const context = useContext(Context);
  const router = useRouter();
  const t = useTranslations("Header");
  const path = usePathname();
  const { token } = theme.useToken();
  const showTitle = useDimension({ xs: false, sm: false, defaultValue: true });

  const onPressEnter = (value: string) => {
    if (value.length > 1) router.push(`/search?q=${value}`);
  };

  return (
    <Layout.Header style={headerStyle}>
      <MainMenu />
      <Row
        wrap={false}
        align="middle"
        // gutter={[2, 0]}
        style={{
          width: "100%",
          backgroundColor: token.colorBgContainer,
          borderBottomWidth: token.lineWidth,
          borderBottomColor: token.colorSplit,
          borderBottomStyle: "solid",
        }}
      >
        <Col flex="none">
          <Flex align="center" style={{ width: "100%" }}>
            <Input.Search
              placeholder="input search"
              loading={false}
              onSearch={onPressEnter}
            />
          </Flex>
        </Col>
        <Col flex="auto" />
        <Col flex="none">
          <ThemeSwitcher />
        </Col>
        <Col flex="none">
          <LocaleSelector />
        </Col>
        <Col flex="none">
          {context?.user ? (
            <Popover
              trigger="click"
              content={
                <>
                  <Button>{t("profile")}</Button>
                  <Button
                    icon={<LogoutOutlined />}
                    onClick={() => {
                      handleRequest(
                        { pathName: path },
                        SignOut,
                        getRedirectMethod() === "client" ? router : null
                      );
                    }}
                  >
                    {t("signout")}
                  </Button>
                </>
              }
            >
              <Avatar
                style={{
                  display: "flex",
                  backgroundColor: "rgba(0,0,0,0.20)",
                }}
                size={42}
                src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${context.user.id}`}
              />
            </Popover>
          ) : (
            <Tooltip placement="leftBottom" title={t("signin")}>
              <Button
                style={{ display: "flex" }}
                shape="default"
                icon={<LoginOutlined />}
                onClick={() => {
                  router.push(`/signin`);
                }}
              />
            </Tooltip>
          )}
        </Col>
      </Row>
    </Layout.Header>
  );
};

export { Header };
