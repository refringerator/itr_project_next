"use client";
import { Collection } from "@prisma/client";
import CollectionCard from "./CollectionCard";
import { Col, Row } from "antd";
import useDimension from "@/hooks/useDimension";

type CollectionCardList = {
  collections: Collection[];
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
            <CollectionCard name={c.title} />
          </Col>
        );
      })}
    </Row>
  );
}
