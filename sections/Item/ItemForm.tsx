"use client";

import { Select, Button, Form, Input } from "antd";
import type { FormProps } from "antd";

import { Tag } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import { UserCollectionType } from "@/utils/prisma/collections";
import CustomFormField from "@/sections/Collection/CustomFormField";
import { Link, usePathname, useRouter } from "@/navigation";
import { formatDate, getKeysWithDateType, parseDate } from "@/utils/helpers";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

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
  dateFields?: string[];
}

const getCustomFields = (
  collections: UserCollectionType[],
  collectionId: number
) => {
  const c = collections.find((c) => c.id === collectionId);
  return c?.customFields || [];
};

export default function ItemForm({
  collections,
  tags,
  onFinish,
  buttonText = "Create",
  initialValues,
  dateFields = [],
}: CollectionFormProps) {
  const searchParams = useSearchParams();
  const [fields, setFields] = useState<UserCollectionType["customFields"]>(
    getCustomFields(collections, initialValues?.collectionId || -1)
  );

  const [dateKeys, setDateKeys] = useState(dateFields);
  const [laoding, setLoading] = useState(false);
  const [form] = Form.useForm();
  const t = useTranslations("Item.Form");
  const tc = useTranslations("Common");
  const router = useRouter();
  const path = usePathname();

  const collectionOnChange = useCallback(
    (selectedId: number) => {
      const cfs = getCustomFields(collections, selectedId);
      setFields(cfs);
      setDateKeys(getKeysWithDateType(cfs));
    },
    [collections]
  );

  useEffect(() => {
    const collectionId = parseInt(searchParams.get("collectionId") || "");
    if (collectionId && collections.map((c) => c.id).includes(collectionId)) {
      form.setFieldsValue({ collectionId });
      collectionOnChange(collectionId);

      router.replace(path, { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionOnChange, collections, form, path, router]);

  if (collections.length === 0)
    return (
      <div>
        {t("thereIsNoCollections")}
        <Link href="/collections/new"> {t("createNew")}</Link>
      </div>
    );

  return (
    <Form
      form={form}
      name="item_form"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={parseDate(initialValues, dateFields)}
      onFinish={(v) => {
        // console.log(v);
        setLoading(true);
        onFinish && onFinish(formatDate(v, dateKeys));
      }}
      autoComplete="off"
    >
      <Form.Item<ItemFormType>
        label={t("titleLabel")}
        name="title"
        rules={[{ required: true, message: t("titleMessage") }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={t("collectionLabel")}
        name="collectionId"
        rules={[{ required: true, message: t("collectionMessage") }]}
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
        label={t("tagsLabel")}
        name="tagsIds"
        rules={[{ required: false, message: t("tagsMessage") }]}
      >
        <Select mode="tags" placeholder={t("tagsPlaceholder")}>
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
        <Button type="primary" htmlType="submit" loading={laoding}>
          {tc(buttonText as "Update" | "Create")}
        </Button>
      </Form.Item>
    </Form>
  );
}
