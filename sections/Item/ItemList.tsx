"use client";

import React, { useMemo, useTransition } from "react";
import { Space, Switch, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { Item } from "@prisma/client";
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
};

export default function ItemList({ data, showActions }: ItemListProps) {
  const t = useTranslations("Item.List");

  const columns: TableProps<Row>["columns"] = useMemo(
    () => [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
        render: (text, record) => (
          <Link href={`/items/${record.id}`}>{text}</Link>
        ),
      },
      {
        title: "Created at",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (createdAt) => <>{createdAt.toLocaleString()}</>,
      },

      {
        title: "Tags",
        key: "tags",
        dataIndex: "tags",
        render: (_, { tags }) => (
          <>
            {tags.map((tag) => {
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
      {
        title: "Published",
        dataIndex: "published",
        key: "published",
        render: (_, record) => (
          <Switch
            disabled={!showActions}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked={record.published}
          />
        ),
      },
      {
        title: "Action",
        key: "action",
        hidden: !showActions,
        render: (_, record: any) => (
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
    ],
    [showActions, t]
  );

  return <Table rowKey="id" columns={columns} dataSource={data} />;
}
