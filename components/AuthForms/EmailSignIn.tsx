"use client";

import { Link } from "@/navigation";
import { signInWithEmail } from "@/utils/auth-helpers/server";
import { handleRequest } from "@/utils/auth-helpers/client";
import { useRouter } from "@/navigation";
import { useState } from "react";

import { Button, Form, Input } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";

interface EmailSignInProps {
  allowPassword: boolean;
  redirectMethod: string;
  disableButton?: boolean;
}

export default function EmailSignIn({
  allowPassword,
  redirectMethod,
  disableButton,
}: EmailSignInProps) {
  const t = useTranslations("Auth.Forms");
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (e: any) => {
    setIsSubmitting(true);
    await handleRequest(
      e,
      signInWithEmail,
      redirectMethod === "client" ? router : null
    );
    setIsSubmitting(false);
  };

  return (
    <Form
      style={{ maxWidth: "300px" }}
      name="normal_signin_email"
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

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={isSubmitting}
          disabled={disableButton}
        >
          {t("sendEmail")}
        </Button>
        {allowPassword && (
          <>
            <p>
              <Link href="/signin/password_signin">
                {t("signInEmailPassword")}
              </Link>
            </p>
            <p>
              <Link href="/signin/signup">{t("dontHaveAccountSignUp")}</Link>
            </p>
          </>
        )}
      </Form.Item>
    </Form>
  );
}
