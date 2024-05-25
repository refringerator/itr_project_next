"use client";

import { Layout, Flex, Col, Row, Grid } from "antd";
import { Link } from "@/navigation";
import { Input, theme } from "antd";

import { SignOut } from "@/utils/auth-helpers/server";
import { getRedirectMethod } from "@/utils/auth-helpers/settings";
import { handleRequest } from "@/utils/auth-helpers/client";
import { usePathname, useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import LocaleSelector from "../LocaleSelector";
import ThemeSwitcher from "../ThemeSwitcher";
import MainMenu from "../MainMenu";

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
  const screens = Grid.useBreakpoint();

  const onPressEnter = (value: string) => {
    if (value.length > 1) router.push(`/search?q=${value}`);
  };

  console.log({ ...screens });

  return (
    <Layout.Header style={headerStyle}>
      <MainMenu />
      <Row
        wrap={false}
        align="middle"
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
