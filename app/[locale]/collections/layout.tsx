import { Flex } from "antd";

export default function CollectionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex vertical style={{ width: "100%" }}>
      <h1>COLLECTIONS</h1>
      {children}
    </Flex>
  );
}
