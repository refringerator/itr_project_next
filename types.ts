export {};

declare global {
  namespace PrismaJson {
    type TranslationType = { col: string; l: string; t: string }[];
  }
}
