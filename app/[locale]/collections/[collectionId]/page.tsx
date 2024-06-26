"use server";

import { getCollection } from "@/utils/prisma/collections";
import { Link } from "@/navigation";
import { redirect } from "@/navigation";
import Image from "next/image";
import TheCollection from "@/sections/Collection/TheCollection";
import { defaultImage } from "@/constants/server";
import { Col, Flex, Row, Space } from "antd";
import { getSupabaseUser } from "@/utils/auth-helpers/server";
import { CustomField } from "@prisma/client";
import Markdown from "react-markdown";

type Props = {
  params: {
    collectionId: string;
  };
};

export default async function Collection({
  params: { collectionId: id },
}: Props) {
  const collection = await getCollection(Number(id));
  const user = await getSupabaseUser();

  if (!collection) return redirect("/collections");

  const cfs = collection.customFields.map((cf) => `cf_${cf.id}`);

  const items = collection.items.map((i) => ({
    id: i.id,
    published: i.published,
    createdAt: i.createdAt,
    title: i.title,
    tags: i.tags.map((t) => t.title),
    ...{
      ...cfs
        .map((k) => [k, i.customValues[k]])
        .reduce((acc, [key, val]) => {
          const k = key as string;
          acc[k] = val;
          return acc;
        }, {} as Record<any, any>),
    },
  }));

  return (
    <>
      <Row>
        <Col flex={6}>
          <Flex vertical justify="flex-start">
            <h2>{collection.title}</h2>
            <Space>
              <Link href={`/collections/${id}/edit`}>Edit</Link>
              <Link href={`/items/new?collectionId=${id}`}>Add item</Link>
            </Space>
            <p>
              <b>Author: </b>
              {collection.author.name}
            </p>
            <p>
              <b>Topic: </b>
              {collection.topic.title}
            </p>
            <p>{collection.published ? "Published" : "Not published"}</p>
          </Flex>
        </Col>
        <Col flex={2}>
          <Image
            src={collection.coverUrl || defaultImage}
            style={{ objectFit: "contain" }}
            width="350"
            height="350"
            fill={false}
            alt="Picture of the author"
          />
        </Col>
      </Row>
      <h4>Description:</h4>
      <Markdown>{collection.description}</Markdown>

      <TheCollection
        items={items}
        showActions={!!user}
        customFields={collection.customFields as CustomField[]}
      />
    </>
  );
}
