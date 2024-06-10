"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Table, Tag } from "antd";
import type { TableProps } from "antd";
import { getUserIssues } from "@/app/[locale]/actions";
import Link from "next/link";
import { jiraHelpCenter } from "@/constants";
import { useParams } from "next/navigation";

type ColumnsType<T extends object> = TableProps<T>["columns"];

interface DataType {
  key: string;
  summary: string;
  issuetype: string;
  created: string;
  updated: string;
}

const IssuesList: React.FC = () => {
  const [data, setData] = useState([]);
  const { locale } = useParams();

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

  const columns: ColumnsType<DataType> = useMemo(
    () => [
      {
        title: "#",
        dataIndex: "key",
        key: "key",
        render: (text) => (
          <Link href={`${jiraHelpCenter}customer/portal/1/${text}`}>
            {text}
          </Link>
        ),
      },
      {
        title: "Summary",
        dataIndex: "summary",
        key: "summary",
        render: (text, record) => (
          <Link href={`${jiraHelpCenter}customer/portal/1/${record.key}`}>
            {text}
          </Link>
        ),
      },
      {
        title: "Created",
        dataIndex: "created",
        key: "created",
        render: (text) => new Date(text).toLocaleString(locale),
      },
      {
        title: "Updated",
        dataIndex: "updated",
        key: "updated",
        render: (text) => new Date(text).toLocaleString(locale),
      },
      {
        title: "Type",
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
    ],
    [locale]
  );

  return (
    <Table
      columns={columns}
      pagination={{ position: ["none", "bottomCenter"] }}
      dataSource={data}
    />
  );
};

export default IssuesList;
