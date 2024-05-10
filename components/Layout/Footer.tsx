"use client";

import { Layout } from "antd";
const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter style={{ textAlign: "center" }}>
      Created by &copy;petruha
    </AntFooter>
  );
};

export { Footer };
