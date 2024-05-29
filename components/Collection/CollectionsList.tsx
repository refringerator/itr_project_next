"use client";

import React from "react";
import { Avatar, List } from "antd";
import Image from "next/image";

export type CollectionData = {
  title: string;
  description: string;
  updatedAt: Date;
  avatar: string;
  href: string;
  coverUrl: string;
};

export type CollectionListProps = {
  data: CollectionData[];
};

const CollectionsList = ({ data }: CollectionListProps) => {
  const showAuthor = true;
  const showFields = true;

  return (
    <List
      itemLayout="vertical"
      size="large"
      //   pagination={{
      //     onChange: (page) => {
      //       console.log(page);
      //     },

      //     pageSize: 5,
      //   }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          key={item.title}
          extra={
            <Image
              src={item.coverUrl}
              width={150}
              height={150}
              alt="Picture of the collection"
            />
          }
        >
          <List.Item.Meta
            avatar={showAuthor && <Avatar src={item.avatar} />}
            title={<a href={item.href}>{item.title}</a>}
            description={showFields && item.description}
          />
          {item.description}
        </List.Item>
      )}
    />
  );
};

export default CollectionsList;
