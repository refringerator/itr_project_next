"use client";

import { Card } from "antd";
const { Meta } = Card;

type CollectionCardProps = {
  name?: string;
};

export default function CollectionCard({
  name = "CARD TITLE",
}: CollectionCardProps) {
  return (
    <Card
      hoverable
      style={{ width: 340 }}
      title={name}
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }
    >
      <Meta title="Europe Street beat" description="www.instagram.com" />
      <p>
        CONTETNT NCOENONO eodn oend oend oen doen oneon doenod noe ndne ndoen
        doenno den
      </p>
    </Card>
  );
}
