"use client";

import React from "react";
import { Breadcrumb, Layout, theme } from "antd";

const { Content: AntdContent } = Layout;

const Content = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <AntdContent style={{ padding: "0 48px" }}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          background: colorBgContainer,
          minHeight: 280,
          padding: 24,
          borderRadius: borderRadiusLG,
        }}
      >
        {children}
      </div>
    </AntdContent>
  );
};

export { Content };
