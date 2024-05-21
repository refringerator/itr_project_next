"use client";

import { Layout } from "antd";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("Footer");

  return (
    <Layout.Footer style={{ textAlign: "center" }}>
      {t("created_by")} &copy;petruha
    </Layout.Footer>
  );
};

export { Footer };
