"use client";

import { Button, Form, Input } from "antd";
import { Link } from "@/navigation";
import { signInWithPassword } from "@/utils/auth-helpers/server";
import { handleRequest } from "@/utils/auth-helpers/client";
import { useRouter } from "@/navigation";
import { useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

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
      // labelCol={{ span: 8 }}
      // wrapperCol={{ span: 16 }}
      style={{ maxWidth: "300px" }}
      autoComplete="off"
      onFinish={(e) => handleSubmit(e)}
    >
      <Form.Item<FieldType>
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
      <Form.Item<FieldType>
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isSubmitting}>
          Sign in
        </Button>
        <p>
          <Link href="/signin/forgot_password">Forgot your password?</Link>
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
