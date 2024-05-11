"use client";
import { Select, Button, Form, Input } from "antd";
import type { FormProps } from "antd";

import { Collection } from "@prisma/client";

export type ItemFormType = {
  title: string;
  collectionId: number;
};

interface CollectionFormProps {
  buttonText?: string;
  collections: Collection[];
  onFinish: FormProps<ItemFormType>["onFinish"];
  initialValues?: ItemFormType;
}

export default function ItemForm({
  collections,
  onFinish,
  buttonText = "Create",
  initialValues,
}: CollectionFormProps) {
  if (collections.length === 0) return <div>There is no collections!</div>;

  const { title, collectionId } = initialValues || {};

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ title, collectionId }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<ItemFormType>
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please input title!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Collection"
        name="collectionId"
        rules={[{ required: true, message: "Please choice collection!" }]}
      >
        <Select>
          {collections.map((collection) => (
            <Select.Option key={collection.id} value={collection.id}>
              {collection.title}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          {buttonText}
        </Button>
      </Form.Item>
    </Form>
  );
}
