import type { Metadata } from "next";
import "@/styles/globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Layout } from "antd";
import { Content } from "@/components/Content";
import { Suspense } from "react";
import { Notification } from "@/components/Notification/Notification";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "Collection management",
  description: "Full-stack Web-app for personal collection management",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <Layout>
            <Header user={user} />
            <Content>{children}</Content>
            <Footer />
          </Layout>
          <Suspense>
            <Notification />
          </Suspense>
        </AntdRegistry>
      </body>
    </html>
  );
}
