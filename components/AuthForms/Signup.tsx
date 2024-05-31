"use client";

import React from "react";
import { Link } from "@/navigation";
import { signUp } from "@/utils/auth-helpers/server";
import { handleRequest } from "@/utils/auth-helpers/client";
import { useRouter } from "@/navigation";
import { useState } from "react";
import { Button, Form, Input } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";

interface SignUpProps {
  allowEmail: boolean;
  redirectMethod: string;
}

export default function SignUp({ allowEmail, redirectMethod }: SignUpProps) {
  const router = useRouter();
  const t = useTranslations("Auth.Forms");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (e: any) => {
    setIsSubmitting(true);
    await handleRequest(e, signUp, redirectMethod === "client" ? router : null);
    setIsSubmitting(false);
  };

  return (
    <Form
      style={{ maxWidth: "300px" }}
      name="normal_signup"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: t("emailMessage"),
            type: "email",
          },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder={t("emailPlaceholder")} />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: t("passwordMessage") }]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder={t("passwordPlaceholder")}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isSubmitting}>
          {t("signUp")}
        </Button>
        <p>{t("alreadyHaveAccount")}</p>
        <p>
          <Link href="/signin/password_signin">{t("signInEmailPassword")}</Link>
        </p>
        {allowEmail && (
          <p>
            <Link href="/signin/email_signin">{t("signMagicLink")}</Link>
          </p>
        )}
      </Form.Item>
    </Form>
  );
}
