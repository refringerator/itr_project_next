"use client";

import React from "react";
import { Flex, Layout, theme } from "antd";

const Content = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout.Content style={{ paddingTop: "4px", display: "flex" }}>
      <Flex
        style={{
          background: colorBgContainer,
          minHeight: 280,
          width: "100%",
          padding: 24,
          borderRadius: borderRadiusLG,
          display: "flex",
          justifyContent: "center",
          // alignItems: "center",
        }}
      >
        {children}
      </Flex>
    </Layout.Content>
  );
};

export { Content };
