"use client";

import { Context } from "@/context";
import { Button, Input, Space } from "antd";
import { useTranslations } from "next-intl";
import { useContext, useState } from "react";

type CommentProps = {
  action: (starg0: string) => void;
};

export default function CommentForm({ action }: CommentProps) {
  const context = useContext(Context);
  const t = useTranslations("Components.CommentForm");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const buttonAvailable = Boolean(context?.user);

  const onClick = async () => {
    if (!value) return;

    setLoading(true);
    await action(value);
    setValue("");
    setLoading(false);
  };

  return (
    <Space.Compact style={{ maxWidth: "500px", width: "100%" }}>
      <Input.TextArea
        rows={1}
        defaultValue=""
        value={value}
        onChange={(v) => {
          setValue(v.target.value);
        }}
        disabled={!buttonAvailable}
        placeholder={
          buttonAvailable ? t("commentPlaceholder") : t("needLoginFirst")
        }
      />
      <Button
        type="primary"
        loading={loading}
        onClick={onClick}
        disabled={!buttonAvailable}
      >
        {t("buttonAdd")}
      </Button>
    </Space.Compact>
  );
}
