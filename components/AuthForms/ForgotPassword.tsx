"use client";

import { Link } from "@/navigation";
import { requestPasswordUpdate } from "@/utils/auth-helpers/server";
import { handleRequest } from "@/utils/auth-helpers/client";
import { useRouter } from "@/navigation";
import { useState } from "react";

import { MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useTranslations } from "next-intl";

interface ForgotPasswordProps {
  allowEmail: boolean;
  redirectMethod: string;
  disableButton?: boolean;
}

export default function ForgotPassword({
  allowEmail,
  redirectMethod,
  disableButton,
}: ForgotPasswordProps) {
  const t = useTranslations("Auth.Forms");
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (e: any) => {
    setIsSubmitting(true);
    await handleRequest(
      e,
      requestPasswordUpdate,
      redirectMethod === "client" ? router : null
    );
    setIsSubmitting(false);
  };

  return (
    <Form
      name="forgot_password"
      initialValues={{ remember: true }}
      style={{ maxWidth: "300px" }}
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

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={isSubmitting}
          disabled={disableButton}
        >
          {t("sendEmail")}
        </Button>
        <p>
          <Link href="/signin/password_signin">{t("signInEmailPassword")}</Link>
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
