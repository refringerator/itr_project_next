"use client";

import { Button, Form, Input } from "antd";
import { Link } from "@/navigation";
import { signInWithPassword } from "@/utils/auth-helpers/server";
import { handleRequest } from "@/utils/auth-helpers/client";
import { useRouter } from "@/navigation";
import { useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";

interface PasswordSignInProps {
  allowEmail: boolean;
  redirectMethod: string;
}

type FieldType = {
  email?: string;
  password?: string;
};

export default function PasswordSignIn({
  allowEmail,
  redirectMethod,
}: PasswordSignInProps) {
  const router = useRouter();
  const t = useTranslations("Auth.Forms");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: FieldType) => {
    setIsSubmitting(true);
    await handleRequest(
      data,
      signInWithPassword,
      redirectMethod === "client" ? router : null
    );
    setIsSubmitting(false);
  };

  return (
    <Form
      name="password_signin"
      style={{ maxWidth: "300px" }}
      autoComplete="off"
      onFinish={(e) => handleSubmit(e)}
    >
      <Form.Item<FieldType>
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
      <Form.Item<FieldType>
        name="password"
        rules={[{ required: true, message: t("passwordMessage") }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder={t("passwordPlaceholder")}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isSubmitting}>
          {t("signIn")}
        </Button>
        <p>
          <Link href="/signin/forgot_password">{t("forgotPassword")}</Link>
        </p>
        {allowEmail && (
          <p>
            <Link href="/signin/email_signin">{t("signMagicLink")}</Link>
          </p>
        )}
        <p>
          <Link href="/signin/signup">{t("dontHaveAccountSignUp")}</Link>
        </p>
      </Form.Item>
    </Form>
  );
}
