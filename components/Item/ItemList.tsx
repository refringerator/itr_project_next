"use client";

import React from "react";
import { Space, Switch, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { Item } from "@prisma/client";
import { Link } from "@/navigation";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

export type Row = Pick<Item, "id" | "title" | "published" | "createdAt"> & {
  tags: string[];
};

export type ItemsList = Row[];

export type ItemListProps = {
  data: Row[];
};

const columns: TableProps<Row>["columns"] = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render: (text, record) => <Link href={`/items/${record.id}`}>{text}</Link>,
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
        checkedChildren={<CheckOutlined />}
        unCheckedChildren={<CloseOutlined />}
        defaultChecked={record.published}
      />
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

export default function ItemList({ data }: ItemListProps) {
  return <Table rowKey="id" columns={columns} dataSource={data} />;
}
