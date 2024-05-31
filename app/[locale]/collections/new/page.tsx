"use server";

import CollectionForm from "@/sections/Collection/CollectionForm";
import {
  createCollection,
  getTranslatedTopics,
} from "@/app/[locale]/collections/actions";
import { getSupabaseUserOrRedirect } from "@/utils/auth-helpers/server";

type Props = {
  params: {
    locale: string;
  };
};

export default async function NewCollection({ params: { locale } }: Props) {
  await getSupabaseUserOrRedirect("/signin");

  const topics = await getTranslatedTopics(locale);

  return (
    <>
      <h2>Create collection</h2>
      <CollectionForm topics={topics} onFinish={createCollection} />
    </>
  );
}
