"use client";
import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { getUserIssues } from "@/app/[locale]/actions";
import Link from "next/link";
import { jiraHelpCenter } from "@/constants";

type ColumnsType<T extends object> = TableProps<T>["columns"];

interface DataType {
  key: string;
  summary: string;
  issuetype: string;
  created: string;
  updated: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "key",
    dataIndex: "key",
    key: "key",
    render: (text) => (
      <Link href={`${jiraHelpCenter}customer/portal/1/${text}`}>{text}</Link>
    ),
  },
  {
    title: "summary",
    dataIndex: "summary",
    key: "summary",
  },
  {
    title: "created",
    dataIndex: "created",
    key: "created",
  },
  {
    title: "updated",
    dataIndex: "updated",
    key: "updated",
  },
  {
    title: "issuetype",
    key: "issuetype",
    dataIndex: "issuetype",
    render: (tags: string) => (
      <span>
        {[tags].map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
];

const IssuesList: React.FC = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const d = async () => {
      const res: any = await getUserIssues();
      if (!res) return;

      // console.log({ issues });

      setData(
        (res.issues as any).map((i: any) => ({
          key: i.key,
          summary: i.fields.summary,
          issuetype: i.fields.issuetype.name,
          created: i.fields.created,
          updated: i.fields.updated,
        }))
      );
    };
    d();
  }, []);

  return (
    <Table
      columns={columns}
      pagination={{ position: ["none", "bottomCenter"] }}
      dataSource={data}
    />
  );
};

export default IssuesList;
