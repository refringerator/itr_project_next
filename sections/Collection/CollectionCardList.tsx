"use client";

import CollectionCard from "./CollectionCard";
import { Col, Row } from "antd";
import useDimension from "@/hooks/useDimension";
import { CollectionCardType } from "@/utils/prisma/collections";

type CollectionCardList = {
  collections: (Omit<CollectionCardType, "coverUrl"> & { coverUrl: string })[];
};

export default function CollectionCardList({
  collections,
}: CollectionCardList) {
  const count = useDimension({
    xs: 3,
    sm: 3,
    md: 4,
    lg: 4,
    xl: 6,
    xxl: 8,
  });
  return (
    <Row justify="space-around" gutter={[12, 12]}>
      {collections.map((c, index) => {
        if (index >= (count as number)) return null;
        return (
          <Col key={c.id} xs={18} sm={16} md={12} lg={10} xl={8} xxl={5}>
            <CollectionCard collection={c} />
          </Col>
        );
      })}
    </Row>
  );
}
