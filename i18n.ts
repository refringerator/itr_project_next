import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { IntlErrorCode } from "next-intl";
import deepmerge from "deepmerge";

const locales = ["en", "ru"];

export default getRequestConfig(async ({ locale }) => {
  // This can either be defined statically if only a single locale
  // is supported, or alternatively read from the user settings

  if (!locales.includes(locale as any)) notFound();

  const userMessages = (await import(`./translation/${locale}.json`)).default;
  const defaultMessages = (await import(`./translation/en.json`)).default;
  const messages = deepmerge(defaultMessages, userMessages);

  return {
    messages,
    onError(error) {
      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        // Missing translations are expected and should only log an error
        console.log(error);
      } else {
        // Other errors indicate a bug in the app and should be reported
        console.log(error);
      }
    },
    getMessageFallback({ namespace, key, error }) {
      const path = [namespace, key].filter((part) => part != null).join(".");
      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        return key;
      } else {
        return "Dear developer, please fix this message: " + path;
      }
    },
  };
});
