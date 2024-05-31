"use client";

import { Layout, Flex, Col, Row, Button, Tooltip, Popover, Grid } from "antd";
import { theme, Avatar } from "antd";
import { LoginOutlined, MehOutlined } from "@ant-design/icons";

import { useTranslations } from "next-intl";
import LocaleSelector from "@/components/LocaleSelector";

import { useRouter } from "@/navigation";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import MainMenu from "@/components/MainMenu";
import useDimension from "@/hooks/useDimension";

import { useContext, useEffect } from "react";
import { Context } from "@/context/context-provider";
import SignOutButton from "@/components/SignOutButton";
import SearchBar from "@/components/SearchBar";

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

  const { token } = theme.useToken();
  // const showTitle = useDimension({
  //   xs: true,
  //   sm: true,
  //   lg: true,
  //   md: true,
  //   xl: true,
  //   xxl: true,
  // });
  const screens = Grid.useBreakpoint();

  useEffect(() => {
    console.table(screens);
  }, [screens]);

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
            <SearchBar />
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
                <Flex vertical gap="small">
                  <Button
                    icon={<MehOutlined />}
                    onClick={() => {
                      router.push(`/account`);
                    }}
                  >
                    {t("profile")}
                  </Button>
                  <Button
                    icon={<MehOutlined />}
                    onClick={() => {
                      router.push(`/my-collections/`);
                    }}
                  >
                    {t("myCollections")}
                  </Button>
                  <SignOutButton />
                </Flex>
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
