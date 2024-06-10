"use client";

import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

import { Divider, Typography } from "antd";
import { HighlightOutlined } from "@ant-design/icons";
const { Text, Paragraph } = Typography;
import SignOutButton from "@/components/SignOutButton";
import UserToken from "@/components/UserToken";
import { useTranslations } from "next-intl";
import IssuesList from "@/components/IssuesList";

export default function Profile({ username }: { username: string }) {
  const t = useTranslations("Profile");
  const [name, setName] = useState(username);
  const supabase = createClient();

  const onChange = async (text: string) => {
    setName(text);
    await supabase.auth.updateUser({
      data: { custom_name: text },
    });
  };

  return (
    <div style={{ display: "block" }}>
      <Text>{t("urDisplayNameIs")} </Text>
      <Text
        strong
        editable={{
          icon: <HighlightOutlined />,
          tooltip: t("clickToEdit"),
          onChange: onChange,
          enterIcon: null,
          triggerType: ["text", "icon"],
        }}
      >
        {name}
      </Text>
      <Paragraph>{t("uCanChangeIt")}</Paragraph>

      <UserToken />
      <SignOutButton />

      <Divider>Created requests</Divider>
      <IssuesList />
    </div>
  );
}
