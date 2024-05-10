"use client";

import React from "react";
import { Layout, theme } from "antd";

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
