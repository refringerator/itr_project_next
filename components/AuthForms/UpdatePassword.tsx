"use client";

import { Button, Form, Input } from "antd";
import { updatePassword } from "@/utils/auth-helpers/server";
import { handleRequest } from "@/utils/auth-helpers/client";
import { useRouter } from "@/navigation";
import React, { useState } from "react";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: any) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequest(
      e,
      updatePassword,
      redirectMethod === "client" ? router : null
    );
    setIsSubmitting(false);
  };

  return (
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
        label="New Password"
        name="password"
        rules={[{ required: true, message: "New Password" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<FieldType>
        label="Confirm New Password"
        name="passwordConfirm"
        rules={[{ required: true, message: "Confirm New Password" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={isSubmitting}>
          Update Password
        </Button>
      </Form.Item>
    </Form>
  );
}
