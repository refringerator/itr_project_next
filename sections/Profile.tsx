"use client";

import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

import { Typography } from "antd";
import { HighlightOutlined } from "@ant-design/icons";
const { Text, Paragraph } = Typography;
import SignOutButton from "@/components/SignOutButton";

export default function Profile({ username }: { username: string }) {
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

      <SignOutButton />
    </>
  );
}
