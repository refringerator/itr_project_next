"use client";

import React from "react";
import { Avatar, List } from "antd";

export type CollectionData = {
  title: string;
  description: string;
  updatedAt: Date;
  avatar: string;
  href: string;
};

export type CollectionListProps = {
  data: CollectionData[];
};

const CollectionsList = ({ data }: CollectionListProps) => {
  const showAuthor = true;
  const showFields = true;

  const image =
    "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png";

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
          extra={<img width={150} alt="logo" src={image} />}
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
