"use client";

import { HelpCenterLink } from "@/components/HelpCenterLink";
import { Divider, Layout } from "antd";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("Footer");

  return (
    <Layout.Footer style={{ textAlign: "center" }}>
      {t("created_by")} &copy;petruha <Divider type="vertical" />
      <HelpCenterLink />
    </Layout.Footer>
  );
};

export { Footer };
