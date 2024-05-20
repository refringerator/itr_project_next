import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

const locales = ["en", "ru"];

export default getRequestConfig(async ({ locale }) => {
  // This can either be defined statically if only a single locale
  // is supported, or alternatively read from the user settings

  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`./translation/${locale}.json`)).default,
  };
});
