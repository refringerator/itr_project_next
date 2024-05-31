import { Flex } from "antd";

export default function CollectionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex vertical>
      <h1>COLLECTIONS</h1>
      {children}
    </Flex>
  );
}
