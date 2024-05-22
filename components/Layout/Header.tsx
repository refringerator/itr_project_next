"use client";

import { Layout, Flex } from "antd";
import { Link } from "@/navigation";
import { Input } from "antd";

const { Header: AntdHeader } = Layout;
const { Search } = Input;

import { SignOut } from "@/utils/auth-helpers/server";
import { getRedirectMethod } from "@/utils/auth-helpers/settings";
import { handleRequest } from "@/utils/auth-helpers/client";
import { usePathname, useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import LocaleSelector from "../LocaleSelector";
import ThemeSwitcher from "../ThemeSwitcher";

interface HeaderProps {
  user?: any;
}

const Header = ({ user }: HeaderProps) => {
  const router = useRouter();
  const path = usePathname();
  const t = useTranslations("Header");

  const onPressEnter = (value: string) => {
    if (value.length > 1) router.push(`/search?q=${value}`);
  };

  return (
    <AntdHeader style={{ display: "flex" }}>
      <Flex align="center" justify="space-between" style={{ width: "100%" }}>
        <Link href="/">{t("home")}</Link>
        <Link href="/collections">{t("collecions")}</Link>
        <Link href="/items">{t("items")}</Link>
        <LocaleSelector />
        <ThemeSwitcher />
        <Search
          style={{ maxWidth: "400px" }}
          placeholder="input search"
          loading={false}
          enterButton
          onSearch={onPressEnter}
        />
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
      </Flex>
    </AntdHeader>
  );
};

export { Header };
