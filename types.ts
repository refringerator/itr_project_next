export {};

import en from "./translation/en.json";

type Messages = typeof en;

declare global {
  namespace PrismaJson {
    type TranslationType = { col: string; l: string; t: string }[];
    type CustomValuesType = Record<string, boolean | string | number>;
  }

  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}
