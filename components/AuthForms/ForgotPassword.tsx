"use client";

import { Link } from "@/navigation";
import { requestPasswordUpdate } from "@/utils/auth-helpers/server";
import { handleRequest } from "@/utils/auth-helpers/client";
import { useRouter } from "@/navigation";
import { useState } from "react";

import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

// Define prop type with allowEmail boolean
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
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (e: any) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
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
            message: "Please input your email!",
            type: "email",
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Email" />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={isSubmitting}
          disabled={disableButton}
        >
          Send Email
        </Button>
        <p>
          <Link href="/signin/password_signin">
            Sign in with email and password
          </Link>
        </p>
        {allowEmail && (
          <p>
            <Link href="/signin/email_signin">Sign in via magic link</Link>
          </p>
        )}
        <p>
          <Link href="/signin/signup">Don&apos;t have an account? Sign up</Link>
        </p>
      </Form.Item>
    </Form>
  );
}
