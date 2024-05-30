"use client";

import { NextIntlClientProvider, IntlErrorCode } from "next-intl";

function onError(error: any) {
  if (error.code === IntlErrorCode.MISSING_MESSAGE) {
    // Missing translations are expected and should only log an error
    console.log(error);
  } else {
    // Other errors indicate a bug in the app and should be reported
    console.log(error);
  }
}

function getMessageFallback({ namespace, key, error }: any) {
  const path = [namespace, key].filter((part) => part != null).join(".");

  if (error.code === IntlErrorCode.MISSING_MESSAGE) {
    return path + " is not yet translated";
  } else {
    return "Dear developer, please fix this message: " + path;
  }
}

export default function ContextProvider({
  children,
  messages,
  locale,
}: {
  children: React.ReactNode;
  messages: any;
  locale: any;
}) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      onError={onError}
      getMessageFallback={getMessageFallback}
    >
      {children}
    </NextIntlClientProvider>
  );
}
