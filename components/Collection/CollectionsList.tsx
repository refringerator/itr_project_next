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
};

export type CollectionListProps = {
  data: CollectionData[];
};

const data = Array.from({ length: 23 }).map((_, i) => ({
  href: "https://ant.design",
  title: `ant design part ${i}`,
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
  description:
    "Ant Design, a design language for background applications, is refined by Ant UED Team.",
  content:
    "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
}));

const CollectionsList = ({ data }: CollectionListProps) => {
  const showAuthor = false;
  const showFields = false;

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
