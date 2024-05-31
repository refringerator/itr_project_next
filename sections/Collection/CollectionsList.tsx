"use client";

import React from "react";
import { Avatar, List } from "antd";
import Image from "next/image";
import { CollectionCardWithCoverAndCFs } from "@/utils/prisma/collections";
import Markdown from "react-markdown";

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
      renderItem={(collection) => (
        <List.Item
          key={collection.title}
          extra={
            <Image
              src={collection.coverUrl}
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
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${collection.authorId}`}
                />
              )
            }
            title={
              <a href={`/collections/${collection.id}`}>{collection.title}</a>
            }
            description={
              showFields && (
                <>
                  <p>Topic: {collection.topic.title}</p>
                  <p>Items: {collection._count.items}</p>
                  <p>
                    Custom fields:
                    {collection.customFields
                      .map((cf) => `${cf.title} (${cf.type})`)
                      .join(", ")}
                  </p>
                </>
              )
            }
          />
          <Markdown>{collection.description}</Markdown>
        </List.Item>
      )}
    />
  );
};

export default CollectionsList;
