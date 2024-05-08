"use client";

import { Layout, Menu, MenuProps } from "antd";
import Link from "next/link";
const { Header: AntdHeader } = Layout;
import { useRouter } from "next/navigation";

const items = [
  { key: 1, label: <Link href="/">Home</Link> },
  { key: 2, label: <Link href="/dashboard">Dashboard</Link> },
  { key: 3, label: "Home" },
];

const Header = () => {
  const router = useRouter();

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    if (e.key === "3") router.push("/");
    // setCurrent(e.key);
    // router.push("/dashboard");
  };

  return (
    <AntdHeader style={{ display: "flex", alignItems: "center" }}>
      {/* <div className="demo-logo" /> */}
      <Menu
        onClick={onClick}
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        items={items}
        style={{ flex: 1, minWidth: 0 }}
      />
    </AntdHeader>
  );
};

export { Header };
