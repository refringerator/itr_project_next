"use client";

import { CollectionCardWithCover } from "@/utils/prisma/collections";
import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import Image from "next/image";
import { Avatar, Card, Typography } from "antd";
import { useRouter } from "@/navigation";
const { Meta } = Card;

type CollectionCardProps = {
  collection: CollectionCardWithCover;
};

export default function CollectionCard({ collection }: CollectionCardProps) {
  const router = useRouter();

  return (
    <Card
      onClick={() => {
        router.push(`/collections/${collection.id}`);
      }}
      hoverable
      style={{ width: 340 }}
      title={collection.title}
      cover={
        <Image
          style={{ objectFit: "contain" }}
          width="340"
          height="225"
          fill={false}
          alt="cover"
          src={collection.coverUrl}
        />
      }
      actions={[
        <></>,
        <></>,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta
        avatar={
          <Avatar
            src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${collection.authorId}`}
          />
        }
        title={collection.author.name}
        description={
          <Typography.Paragraph ellipsis={{ rows: 4, expandable: false }}>
            {collection.description}
          </Typography.Paragraph>
        }
      />
    </Card>
  );
}
