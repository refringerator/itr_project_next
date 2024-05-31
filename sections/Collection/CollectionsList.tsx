"use client";

import React from "react";
import { Avatar, List } from "antd";
import Image from "next/image";
import { CollectionCardWithCoverAndCFs } from "@/utils/prisma/collections";

export type CollectionListProps = {
  data: CollectionCardWithCoverAndCFs[];
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
              style={{ objectFit: "contain" }}
              width="225"
              height="225"
              fill={false}
              alt="Picture of the collection"
            />
          }
        >
          <List.Item.Meta
            avatar={
              showAuthor && (
                <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${item.authorId}`}
                />
              )
            }
            title={<a href={`/collections/${item.id}`}>{item.title}</a>}
            description={
              showFields && (
                <>
                  <p>Topic: {item.topic.title}</p>
                  <p>Items: {item._count.items}</p>
                  <p>
                    Custom fields:
                    {item.customFields
                      .map((cf) => `${cf.title} (${cf.type})`)
                      .join(", ")}
                  </p>
                </>
              )
            }
          />
          {item.description}
        </List.Item>
      )}
    />
  );
};

export default CollectionsList;
