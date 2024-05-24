"use server";

import ItemForm from "@/components/Item/ItemForm";
import { createItem } from "@/app/[locale]/items/actions";
import { getSupabaseUserOrRedirect } from "@/utils/auth-helpers/server";
import { getUserCollectionsTagsCFs } from "@/utils/prisma/collections";

export default async function NewCollection() {
  const user = await getSupabaseUserOrRedirect("/signin");

  const { collections, tags } = await getUserCollectionsTagsCFs(user.id);

  return (
    <>
      <h2>Create item</h2>
      <ItemForm collections={collections} tags={tags} onFinish={createItem} />
    </>
  );
}
