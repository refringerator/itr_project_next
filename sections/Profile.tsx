"use client";

import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

import { Typography } from "antd";
import { HighlightOutlined } from "@ant-design/icons";
const { Text, Paragraph } = Typography;
import SignOutButton from "@/components/SignOutButton";
import { useTranslations } from "next-intl";

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
    <>
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

      <SignOutButton />
    </>
  );
}
