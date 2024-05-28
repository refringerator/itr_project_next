"use client";

import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

import { Button, Typography } from "antd";
import { HighlightOutlined, LogoutOutlined } from "@ant-design/icons";
const { Text, Paragraph } = Typography;
import { usePathname, useRouter } from "@/navigation";
import { SignOut } from "@/utils/auth-helpers/server";
import { getRedirectMethod } from "@/utils/auth-helpers/settings";
import { handleRequest } from "@/utils/auth-helpers/client";
import { useTranslations } from "next-intl";

export default function Profile({ username }: { username: string }) {
  const t = useTranslations("Header");
  const path = usePathname();
  const router = useRouter();
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
      <Text>Your current display name is </Text>
      <Text
        strong
        editable={{
          icon: <HighlightOutlined />,
          tooltip: "click to edit your name",
          onChange: onChange,
          enterIcon: null,
          triggerType: ["text", "icon"],
        }}
      >
        {name}
      </Text>
      <Paragraph>You can change it by click on it.</Paragraph>

      <Button
        icon={<LogoutOutlined />}
        onClick={() => {
          handleRequest(
            { pathName: path },
            SignOut,
            getRedirectMethod() === "client" ? router : null
          );
        }}
      >
        {t("signout")}
      </Button>
    </>
  );
}
