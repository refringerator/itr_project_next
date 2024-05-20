"use client";

import { Button, Form, Input } from "antd";
import { Link } from "@/navigation";
import { signInWithPassword } from "@/utils/auth-helpers/server";
import { handleRequest } from "@/utils/auth-helpers/client";
import { useRouter } from "@/navigation";
import { useState } from "react";

// Define prop type with allowEmail boolean
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
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        // noValidate={true}
        autoComplete="off"
        onFinish={(e) => handleSubmit(e)}
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            Sign in
          </Button>
        </Form.Item>
      </Form>

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
    </div>
  );
}
