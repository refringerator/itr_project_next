import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { Header, Footer, Content } from "@/components/Layout";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Layout } from "antd";
import { Suspense } from "react";
import { Notification } from "@/components/Notification/Notification";
import { createClient } from "@/utils/supabase/server";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import AntConfigProvider from "@/context/AntConfigProvider";
import { ThemeProvider } from "next-themes";
import ContextProvider from "@/context/context-provider";

export const metadata: Metadata = {
  title: "Collection management",
  description: "Full-stack Web-app for personal collection management",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <AntdRegistry>
              <AntConfigProvider>
                <ContextProvider value={{ user: user }}>
                  <Layout>
                    <Header />
                    <Content>{children}</Content>
                    <Footer />
                  </Layout>
                  <Suspense>
                    <Notification />
                  </Suspense>
                </ContextProvider>
              </AntConfigProvider>
            </AntdRegistry>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
