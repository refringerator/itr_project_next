"use server";

import CollectionForm from "@/sections/Collection/CollectionForm";
import { createCollection } from "@/app/[locale]/collections/actions";
import { getSupabaseUserOrRedirect } from "@/utils/auth-helpers/server";
import { getTopics } from "@/utils/prisma/topics";

export default async function NewCollection() {
  await getSupabaseUserOrRedirect("/signin");

  const topics = await getTopics();

  return (
    <>
      <h2>Create collection</h2>
      <CollectionForm topics={topics} onFinish={createCollection} />
    </>
  );
}
