"use client";

import { Layout, Menu, MenuProps } from "antd";
import Link from "next/link";
const { Header: AntdHeader } = Layout;

import { SignOut } from "@/utils/auth-helpers/server";
import { getRedirectMethod } from "@/utils/auth-helpers/settings";
import { handleRequest } from "@/utils/auth-helpers/client";
import { usePathname, useRouter } from "next/navigation";

const items = [
  { key: 1, label: <Link href="/">Home</Link> },
  { key: 3, label: <Link href="/collections">Collections</Link> },
  { key: 2, label: <Link href="/items">Items</Link> },
];
interface HeaderProps {
  user?: any;
}

const Header = ({ user }: HeaderProps) => {
  const router = useRouter();
  const path = usePathname();

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  return (
    <AntdHeader style={{ display: "flex", alignItems: "center" }}>
      <Menu
        onClick={onClick}
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        items={[
          ...items,
          {
            key: 55,
            label: user ? (
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
                Sign out
              </button>
            ) : (
              <Link href="/signin">Sign In</Link>
            ),
          },
        ]}
        style={{ flex: 1, minWidth: 0 }}
      />
    </AntdHeader>
  );
};

export { Header };
