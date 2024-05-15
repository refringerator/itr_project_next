"use server";

import ItemForm from "@/components/ItemForm";
import { createItem } from "@/app/items/actions";
import { getSupabaseUserOrRedirect } from "@/utils/auth-helpers/server";
import { getUserCollectionsTags } from "@/utils/prisma/collections";

export default async function NewCollection() {
  const user = await getSupabaseUserOrRedirect("/signin");

  const { collections, tags } = await getUserCollectionsTags(user.id);

  return (
    <>
      <h2>Create item</h2>
      <ItemForm collections={collections} tags={tags} onFinish={createItem} />
    </>
  );
}
