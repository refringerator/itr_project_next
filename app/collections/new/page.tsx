"use server";

import CollectionForm from "@/components/CollectionForm";
import { createCollection, getTopics } from "@/app/collections/actions";
import { getSupabaseUserOrRedirect } from "@/utils/auth-helpers/server";

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
