"use client";
import { Select, Button, Form, Input, Space, Checkbox } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import type { FormProps } from "antd";

import { CustomField, Topic, CustomFieldType } from "@prisma/client";
import ImageUpload from "./ImageUpload";
import { useTranslations } from "next-intl";
import { useState } from "react";

type PartialBy<T, K extends keyof T, D extends keyof T> = Omit<Omit<T, D>, K> &
  Partial<Pick<T, K>>;

export type CollectionFormFieldType = {
  title: string;
  description?: string;
  topicId: number;
  customFields?: PartialBy<CustomField, "id", "collectionId">[];
  cover?: string;
};

type customType = {
  key: CustomFieldType;
  value: String;
};

interface CollectionFormProps {
  buttonText?: string;
  topics: Omit<Topic, "translation">[];
  onFinish: FormProps<CollectionFormFieldType>["onFinish"];
  initialValues?: CollectionFormFieldType;
}

const customTypes: customType[] = [
  { key: "INT", value: "Integer" },
  { key: "BOOLEAN", value: "Boolean" },
  { key: "TEXT", value: "Text" },
  { key: "LONGTEXT", value: "Long Text" },
  { key: "DATE", value: "Date" },
];

export default function CollectionForm({
  topics,
  onFinish,
  buttonText = "Create",
  initialValues,
}: CollectionFormProps) {
  const t = useTranslations("Collection.Form");
  const tc = useTranslations("Common");
  const [loading, setLoading] = useState(false);

  if (topics.length === 0) return <div>{t("noTopics")}</div>;

  const onFormFinish = (data: any) => {
    setLoading(true);
    // console.log({ data });
    onFinish && onFinish({ ...data, cover: data.cover?.at(0)?.url || "" });
  };

  const {
    title,
    description = "",
    topicId,
    customFields,
    cover,
  } = initialValues || {};

  return (
    <Form
      name="collection"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{
        title,
        topicId,
        description,
        cover:
          (cover && [
            {
              uid: cover,
              name: t("cover.currentFilename"),
              status: "done",
              url: cover,
              thumbUrl: cover,
            },
          ]) ||
          [],
      }}
      onFinish={onFormFinish}
      autoComplete="off"
    >
      <Form.Item<CollectionFormFieldType>
        label={t("title.label")}
        name="title"
        rules={[{ required: true, message: t("title.message") }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={t("topic.label")}
        name="topicId"
        rules={[{ required: true, message: t("topic.message") }]}
      >
        <Select>
          {topics.map((topic) => (
            <Select.Option key={topic.id} value={topic.id}>
              {topic.title}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item<CollectionFormFieldType>
        label={t("description.label")}
        name="description"
      >
        <Input.TextArea
          placeholder={t("description.placeholder")}
          autoSize={{ minRows: 2, maxRows: 6 }}
        />
      </Form.Item>

      <Form.Item name="cover" label={t("cover.label")} extra={t("cover.extra")}>
        <ImageUpload />
      </Form.Item>

      <Form.List name="customFields" initialValue={customFields}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: "flex", marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item {...restField} hidden name={[name, "id"]}>
                  <Input />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "title"]}
                  rules={[
                    {
                      required: true,
                      message: t("customField.fieldNameError"),
                    },
                  ]}
                >
                  <Input placeholder={t("customField.fieldNamePlaceholder")} />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "type"]}
                  rules={[
                    {
                      required: true,
                      message: t("customField.fieldTypeError"),
                    },
                  ]}
                >
                  <Select placeholder={t("customField.fieldTypeSelector")}>
                    {customTypes.map((ct) => (
                      <Select.Option key={ct.key} value={ct.key}>
                        {ct.value}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  noStyle
                  {...restField}
                  name={[name, "isRequired"]}
                  valuePropName="checked"
                >
                  <Checkbox>{t("customField.required")}</Checkbox>
                </Form.Item>
                <Form.Item
                  noStyle
                  {...restField}
                  name={[name, "isFilter"]}
                  valuePropName="checked"
                >
                  <Checkbox>{t("customField.asFilter")}</Checkbox>
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                {t("customField.addFiled")}
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          {tc(buttonText as "Update" | "Create")}
        </Button>
      </Form.Item>
    </Form>
  );
}
