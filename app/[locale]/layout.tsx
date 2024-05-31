import "@/styles/globals.css";
import { Suspense } from "react";

import type { Metadata, Viewport } from "next";
// import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { Header, Footer, Content } from "@/sections/Layout";
import { ThemeProvider } from "next-themes";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Layout } from "antd";
import { Notification } from "@/components/Notification";
import { createClient } from "@/utils/supabase/server";
import {
  ContextProvider,
  AntConfigProvider,
  NextIntlClientProvider,
} from "@/context";

export const metadata: Metadata = {
  title: "Collection management",
  description: "Full-stack Web-app for personal collection management",
  icons: { icon: "/favicon.ico" },
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
          <NextIntlClientProvider messages={messages} locale={locale}>
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
