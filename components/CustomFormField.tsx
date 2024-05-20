import { CustomField, CustomFieldType } from "@prisma/client";
import { Form, Input, InputNumber, Checkbox, DatePicker } from "antd";

type CustomFieldProps = {
  field: Omit<CustomField, "collectionId">;
};

function exhaustiveGuard(_value: never): never {
  throw new Error(
    `ERROR! Reached forbidden guard function with unexpected value: ${JSON.stringify(
      _value
    )}`
  );
}

const FormElement = ({ fieldType, ...props }: any) => {
  const type = fieldType as CustomFieldType;

  console.log(props);

  switch (type) {
    case "TEXT":
      return <Input {...props} />;
    case "BOOLEAN":
      return <Checkbox {...props} />;
    case "DATE":
      return <DatePicker {...props} />;
    case "INT":
      return (
        <InputNumber
          {...props}
          step="1"
          parser={(value) => parseInt(value || "") as number}
        />
      );
    case "LONGTEXT":
      return (
        <Input.TextArea {...props} autoSize={{ minRows: 2, maxRows: 6 }} />
      );

    case "LINK":
    case "FILE":
      return <div>Not implemented yet</div>;

    default:
      return exhaustiveGuard(type);
  }
};

const CustomFormField = ({ field }: CustomFieldProps) => {
  return (
    <Form.Item
      label={field.title}
      name={`cf_${field.id}`}
      rules={[{ required: field.isRequired, message: "Field is required!" }]}
      valuePropName={field.type === "BOOLEAN" ? "checked" : undefined}
    >
      <FormElement fieldType={field.type} />
    </Form.Item>
  );
};

export default CustomFormField;
