"use client";
import { Select, Button, Form, Input } from "antd";
import type { FormProps } from "antd";

import { Topic } from "@prisma/client";

export type FieldType = {
  title: string;
  description?: string;
  topicId: number;
};

interface CollectionFormProps {
  buttonText?: string;
  topics: Topic[];
  onFinish: FormProps<FieldType>["onFinish"];
  initialValues?: FieldType;
}

export default function CollectionForm({
  topics,
  onFinish,
  buttonText = "Create",
  initialValues,
}: CollectionFormProps) {
  if (topics.length === 0) return <div>There is no topics!</div>;

  const { title, description, topicId } = initialValues || {};

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ title, topicId, description }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please input title!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Topic"
        name="topicId"
        rules={[{ required: true, message: "Please choice topic!" }]}
      >
        <Select>
          {topics.map((topic) => (
            <Select.Option key={topic.id} value={topic.id}>
              {topic.title}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item<FieldType> label="Description" name="description">
        <Input.TextArea
          placeholder="Something about collection"
          autoSize={{ minRows: 2, maxRows: 6 }}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          {buttonText}
        </Button>
      </Form.Item>
    </Form>
  );
}
