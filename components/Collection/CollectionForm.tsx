"use client";
import { Select, Button, Form, Input, Space, Checkbox } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import type { FormProps } from "antd";

import { CustomField, Topic, CustomFieldType } from "@prisma/client";

type PartialBy<T, K extends keyof T, D extends keyof T> = Omit<Omit<T, D>, K> &
  Partial<Pick<T, K>>;

export type FieldType = {
  title: string;
  description?: string;
  topicId: number;
  customFields?: PartialBy<CustomField, "id", "collectionId">[];
};

type customType = {
  key: CustomFieldType;
  value: String;
};

interface CollectionFormProps {
  buttonText?: string;
  topics: Omit<Topic, "translation">[];
  onFinish: FormProps<FieldType>["onFinish"];
  initialValues?: FieldType;
}

const customTypes: customType[] = [
  { key: "INT", value: "Integer" },
  { key: "BOOLEAN", value: "Boolean" },
  { key: "TEXT", value: "Text" },
  { key: "DATE", value: "Date" },
];

export default function CollectionForm({
  topics,
  onFinish,
  buttonText = "Create",
  initialValues,
}: CollectionFormProps) {
  if (topics.length === 0) return <div>There is no topics!</div>;

  const {
    title,
    description = "",
    topicId,
    customFields,
  } = initialValues || {};

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
                  rules={[{ required: true, message: "Missing field name" }]}
                >
                  <Input placeholder="Field name" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "type"]}
                  rules={[{ required: true, message: "Missing field type" }]}
                >
                  <Select placeholder="Select type">
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
                  <Checkbox
                  // value={false}
                  // defaultChecked={false}
                  // checked={false}
                  >
                    Required
                  </Checkbox>
                </Form.Item>
                <Form.Item
                  noStyle
                  {...restField}
                  name={[name, "isFilter"]}
                  valuePropName="checked"
                >
                  <Checkbox>Used as a filter</Checkbox>
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
                Add custom field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          {buttonText}
        </Button>
      </Form.Item>
    </Form>
  );
}
