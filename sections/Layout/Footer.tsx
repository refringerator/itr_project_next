"use client";

import { jiraHelpCenter } from "@/constants";
import { Divider, Layout } from "antd";
import { useTranslations } from "next-intl";
import Link from "next/link";

const Footer = () => {
  const t = useTranslations("Footer");

  return (
    <Layout.Footer style={{ textAlign: "center" }}>
      {t("created_by")} &copy;petruha <Divider type="vertical" />
      <Link href={jiraHelpCenter}>Help Center</Link>
    </Layout.Footer>
  );
};

export { Footer };
