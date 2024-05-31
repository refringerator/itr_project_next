"use client";

import { Button, Form, Input } from "antd";
import { updatePassword } from "@/utils/auth-helpers/server";
import { handleRequest } from "@/utils/auth-helpers/client";
import { useRouter } from "@/navigation";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { LockOutlined } from "@ant-design/icons";

interface UpdatePasswordProps {
  redirectMethod: string;
}

type FieldType = {
  passwordConfirm?: string;
  password?: string;
};

export default function UpdatePassword({
  redirectMethod,
}: UpdatePasswordProps) {
  const router = useRouter();
  const t = useTranslations("Auth.Forms");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: any) => {
    setIsSubmitting(true);
    await handleRequest(
      e,
      updatePassword,
      redirectMethod === "client" ? router : null
    );
    setIsSubmitting(false);
  };

  return (
    <Form
      name="update_password"
      style={{ maxWidth: "300px" }}
      autoComplete="off"
      onFinish={(e) => handleSubmit(e)}
    >
      <Form.Item<FieldType>
        name="password"
        rules={[{ required: true, message: t("newPasswordMessage") }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder={t("newPasswordPlaceholder")}
        />
      </Form.Item>

      <Form.Item<FieldType>
        name="passwordConfirm"
        rules={[{ required: true, message: t("confirmNewPasswordMessage") }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder={t("confirmNewPasswordPlaceholder")}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={isSubmitting}>
          {t("updatePassword")}
        </Button>
      </Form.Item>
    </Form>
  );
}
