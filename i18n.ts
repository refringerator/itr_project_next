import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import deepmerge from "deepmerge";

const locales = ["en", "ru"];

export default getRequestConfig(async ({ locale }) => {
  // This can either be defined statically if only a single locale
  // is supported, or alternatively read from the user settings

  if (!locales.includes(locale as any)) notFound();

  const userMessages = (await import(`./translation/${locale}.json`)).default;
  const defaultMessages = (await import(`./translation/en.json`)).default;
  const messages = deepmerge(defaultMessages, userMessages);

  return { messages };
});
