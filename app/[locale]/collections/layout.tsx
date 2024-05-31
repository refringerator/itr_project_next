import { Col, Row } from "antd";

export default function CollectionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Row justify="space-around" gutter={[12, 12]}>
      <Col span={24}>
        <h1>COLLECTIONS</h1>
      </Col>
      <Col span={24}>{children}</Col>
    </Row>
  );
}
