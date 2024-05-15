"use server";

import CollectionForm from "@/components/CollectionForm";
import { createCollection, getTopics } from "@/app/collections/actions";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function NewCollection() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/signin");
  }

  const topics = await getTopics();

  return (
    <>
      <h2>Create collection</h2>
      <CollectionForm topics={topics} onFinish={createCollection} />
    </>
  );
}
