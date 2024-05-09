import type { Metadata } from "next";
import "@/styles/globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Layout } from "antd";
import { Content } from "@/components/Content";

export const metadata: Metadata = {
  title: "Collection management",
  description: "Full-stack Web-app for personal collection management",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <Layout>
            <Header />
            <Content>{children}</Content>
            <Footer />
          </Layout>
        </AntdRegistry>
      </body>
    </html>
  );
}
