"use client";
import { Select, Button, Form, Input } from "antd";

import type { FormProps } from "antd";

import { Collection, Tag } from "@prisma/client";
import { useState } from "react";
import { UserCollectionType } from "@/utils/prisma/collections";
import CustomFormField from "./CustomFormField";

export type ItemFormType = {
  title: string;
  collectionId: number;
  tagsIds: string[];
};

interface CollectionFormProps {
  buttonText?: string;
  collections: UserCollectionType[];
  tags: Tag[];
  onFinish: FormProps<ItemFormType>["onFinish"];
  initialValues?: ItemFormType;
}

export default function ItemForm({
  collections,
  tags,
  onFinish,
  buttonText = "Create",
  initialValues,
}: CollectionFormProps) {
  const [fields, setFields] = useState<UserCollectionType["customFields"]>([]);

  if (collections.length === 0) return <div>There is no collections!</div>;

  const { title, collectionId, tagsIds } = initialValues || {};

  const collectionOnChange = (selectedId: Number) => {
    const c = collections.find((c) => c.id === selectedId);
    c && setFields(c.customFields);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{
        title,
        collectionId,
        tagsIds,
        // cf_2: false,
        // cf_3: 0,
        // cf_4: "",
      }}
      onFinish={
        // (v) => console.log(v)
        onFinish
      }
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
        <Select onChange={collectionOnChange}>
          {collections.map((collection) => (
            <Select.Option key={collection.id} value={collection.id}>
              {collection.title}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Tags"
        name="tagsIds"
        rules={[{ required: false, message: "Please choice tags!" }]}
      >
        <Select mode="tags" placeholder="Tags">
          {tags.map((tag) => (
            <Select.Option key={tag.title} value={tag.title}>
              {tag.title}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      {fields.map((f) => (
        <CustomFormField field={f} key={f.id} />
      ))}

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          {buttonText}
        </Button>
      </Form.Item>
    </Form>
  );
}
