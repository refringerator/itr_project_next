"use client";

import React from "react";
import { Layout, theme } from "antd";

const Content = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout.Content style={{ paddingTop: "4px" }}>
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
    </Layout.Content>
  );
};

export { Content };
