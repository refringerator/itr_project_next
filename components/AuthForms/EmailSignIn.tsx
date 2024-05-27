"use client";

import { Link } from "@/navigation";
import { signInWithEmail } from "@/utils/auth-helpers/server";
import { handleRequest } from "@/utils/auth-helpers/client";
import { useRouter } from "@/navigation";
import { useState } from "react";

import { Button, Form, Input } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";

// Define prop type with allowPassword boolean
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
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (e: any) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
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
            message: "Please input your email!",
            type: "email",
          },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="Email" />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={isSubmitting}
          disabled={disableButton}
        >
          Sign in
        </Button>
        {allowPassword && (
          <>
            <p>
              <Link href="/signin/password_signin">
                Sign in with email and password
              </Link>
            </p>
            <p>
              <Link href="/signin/signup">
                Don&apos;t have an account? Sign up
              </Link>
            </p>
          </>
        )}
      </Form.Item>
    </Form>
  );
}
