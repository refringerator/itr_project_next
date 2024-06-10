"use client";

import { FloatButton, Modal, Select, Typography } from "antd";
import { message, Form, Input } from "antd";

import { QuestionCircleOutlined } from "@ant-design/icons";
import { createCustomerRequest } from "@/app/[locale]/actions";
import { HelpCenterLink } from "./HelpCenterLink";
import Link from "next/link";

import React, { useState, useContext } from "react";
import { Context } from "@/context";
import { useParams } from "next/navigation";
// import { useRouter } from "next/router";

export interface FormValues {
  title: string;
  description: string;
  priority: string;
  url?: string;
  collectionId?: string;
  itemId?: string;
  collection?: string;
}

type Params = {
  collectionId?: string;
  itemId?: string;
};

export default function UserHelper() {
  const context = useContext(Context);
  const parameters = useParams<Params>();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>();
  const [messageApi, contextHolder] = message.useMessage();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const userId = context?.user?.id || "";
  const userEmail = context?.user?.email || "";

  const onCreate = async (values: FormValues) => {
    setConfirmLoading(true);
    console.log("Received values of form: ", values);
    setFormValues(values);
    try {
      const { collectionId, itemId } = parameters;
      const params = {
        ...values,
        url: window.location.href,
        collectionId,
        itemId,
      };
      const res = await createCustomerRequest(userId, userEmail, params);
      messageApi.open(
        res === 201
          ? {
              type: "success",
              content: "New request created!",
            }
          : {
              type: "error",
              content: "This is an error",
            }
      );
    } catch {
      messageApi.open({
        type: "error",
        content: "This is an error",
      });
      return console.log("Oops errors!");
    }
    setOpen(false);
    setConfirmLoading(false);
  };

  return (
    <>
      {contextHolder}
      <FloatButton
        icon={<QuestionCircleOutlined />}
        type="default"
        style={{ right: 24 }}
        tooltip={<div>Need help?</div>}
        onClick={() => setOpen(true)}
      />
      <Modal
        open={open}
        title="Create a new help request"
        okText={userId === "" ? "OK" : "Create"}
        cancelText="Cancel"
        confirmLoading={confirmLoading}
        okButtonProps={{ autoFocus: true, htmlType: "submit" }}
        onCancel={() => setOpen(false)}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="form_in_modal"
            initialValues={{ priority: "Medium" }}
            // clearOnDestroy
            onFinish={(values) => onCreate(values)}
          >
            {dom}
          </Form>
        )}
      >
        {userId === "" ? (
          <>
            <p>
              You need <Link href="/signin">login</Link> first to ask question
              in Collections App
            </p>
            <p>
              <Typography.Text>
                Or you can create request on our{" "}
              </Typography.Text>
              <HelpCenterLink />
            </p>
          </>
        ) : (
          <>
            <Form.Item
              name="title"
              label="Title"
              rules={[
                {
                  required: true,
                  message: "Please input the title!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "Please input the description!",
                },
              ]}
            >
              <Input.TextArea autoSize={{ minRows: 3, maxRows: 8 }} />
            </Form.Item>
            <Form.Item
              name="priority"
              label="Priority"
              rules={[
                {
                  required: true,
                  message: "Please select the priority!",
                },
              ]}
            >
              <Select
                options={[
                  { value: "Low", label: "Low" },
                  { value: "Medium", label: "Medium" },
                  { value: "High", label: "High" },
                ]}
              />
            </Form.Item>
          </>
        )}
      </Modal>
      [messageApi]
    </>
  );
}
