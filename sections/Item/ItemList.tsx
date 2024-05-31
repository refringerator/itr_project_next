"use client";

import React, { useMemo } from "react";
import { Space, Switch, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { CustomField, Item } from "@prisma/client";
import { Link } from "@/navigation";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { DeleteButton } from "@/components/DeleteButton";
import { useTranslations } from "next-intl";
import { deleteItemWithCheck } from "@/app/[locale]/items/actions";

export type Row = Pick<Item, "id" | "title" | "published" | "createdAt"> & {
  tags: string[];
};

export type ItemsList = Row[];

export type ItemListProps = {
  data: Row[];
  showActions: boolean;
  customFields: CustomField[];
  setPublishItem: (itemId: number, isPublished: boolean) => void;
};

export default function ItemList({
  data,
  showActions,
  customFields,
  setPublishItem,
}: ItemListProps) {
  const t = useTranslations("Item.List");

  console.log({ customFields });

  const columns: TableProps<Row>["columns"] = useMemo(
    () =>
      [
        {
          title: "Title",
          dataIndex: "title",
          key: "title",
          render: (text: any, record: any) => (
            <Link href={`/items/${record.id}`}>{text}</Link>
          ),
        },
        {
          title: "Created at",
          dataIndex: "createdAt",
          key: "createdAt",
          render: (createdAt: any) => <>{createdAt.toLocaleString()}</>,
        },

        {
          title: "Tags",
          key: "tags",
          dataIndex: "tags",
          render: (_: any, { tags }: any) => (
            <>
              {tags.map((tag: any) => {
                let color =
                  tag.length > 5
                    ? tag.length > 10
                      ? "geekblue"
                      : "volcano"
                    : "green";

                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          ),
        },
        customFields
          ?.filter((cf) => cf.isFilter)
          .map((cf) => ({
            title: cf.title,
            key: `cf_${cf.id}`,
            // hidden: !showActions,
            render: (createdAt: any) => <>{createdAt}</>,
            dataIndex: `cf_${cf.id}`,
          })),
        {
          title: "Published",
          dataIndex: "published",
          key: "published",
          render: (_: any, record: any) => (
            <Switch
              disabled={!showActions}
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              defaultChecked={record.published}
              onChange={async (v) => await setPublishItem(record.id, v)}
            />
          ),
        },
        {
          title: "Action",
          key: "action",
          hidden: !showActions,
          render: (_: any, record: any) => (
            <Space size="middle">
              <Link href={`/items/${record.id}/edit`}>Edit</Link>
              <DeleteButton
                type="link"
                buttonText={t("deleteButton")}
                confirmTitle={t("deleteConfirmTitle")}
                descriptionText={t("deleteConfirmDesctiption")}
                onClick={deleteItemWithCheck.bind(null, record.id)}
              />
            </Space>
          ),
          dataIndex: "",
        },
      ].flat(),
    [customFields, setPublishItem, showActions, t]
  );

  console.log({ columns });
  return <Table rowKey="id" columns={columns} dataSource={data} />;
}
