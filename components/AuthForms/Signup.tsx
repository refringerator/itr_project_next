"use client";

import React from "react";
import { Link } from "@/navigation";
import { signUp } from "@/utils/auth-helpers/server";
import { handleRequest } from "@/utils/auth-helpers/client";
import { useRouter } from "@/navigation";
import { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

// Define prop type with allowEmail boolean
interface SignUpProps {
  allowEmail: boolean;
  redirectMethod: string;
}

export default function SignUp({ allowEmail, redirectMethod }: SignUpProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (e: any) => {
    setIsSubmitting(true);
    await handleRequest(e, signUp, redirectMethod === "client" ? router : null);
    setIsSubmitting(false);
  };

  return (
    <div>
      <Form
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
              message: "Please input your email!",
              type: "email",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            Sign up
          </Button>
        </Form.Item>
      </Form>

      <p>Already have an account?</p>
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
    </div>
  );
}
